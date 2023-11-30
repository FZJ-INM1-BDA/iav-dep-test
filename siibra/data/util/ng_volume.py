import json
from urllib.parse import ParseResult
import os
from random import random
import math
from concurrent.futures import ThreadPoolExecutor
from itertools import product

from tqdm import tqdm
import numpy as np
from neuroglancer_scripts.http_accessor import HttpAccessor
from neuroglancer_scripts.precomputed_io import get_IO_for_existing_dataset

from .common import get_all_http_str, fail_fast_dec, CheckResult

NG_SRC_PREFIX = ("neuroglancer/precomputed",)

# Seems to load +- 2 levels (20um --> 320um)
try:
    NG_LEVELS = int(os.getenv("NG_LEVELS", "2"))
except Exception as e:
    print("parsing NG_LEVELS error:", e)
# At high magification (showing 20um), clean load results in loading of ~300 chunks at 20um level
try:
    NG_CHUNKS_MAX_LEVEL = int(os.getenv("NG_CHUNKS_MAX_LEVEL", "256"))
except Exception as e:
    print("parsing NG_CHUNKS_MAX_LEVEL error: ", e)

NG_QUICK_CHECK = os.getenv("NG_QUICK_CHECK")

NG_SRC_PREFIX = ("neuroglancer/precomputed",)

def get_all_vol_ng_src(item) -> list[ParseResult]:
    if isinstance(item, dict):
        if any(key in NG_SRC_PREFIX for key in item):
            return [v
                    for key in item
                    if key in NG_SRC_PREFIX
                    for v in get_all_http_str(item[key])]
        return [v for key in item for v in get_all_vol_ng_src(item[key])]
    
    if isinstance(item, list):
        return [i for it in item for i in get_all_vol_ng_src(it)]
    if isinstance(item, (int,  float, str)):
        return []
    if item is None:
        return []
    raise Exception(f"cannot process {item} with type {type(item)}")

def get_neuroglancer_src(file_to_json) -> list[ParseResult]:
    with open(file_to_json) as fp:
        json_obj = json.load(fp)
        return [f for f in get_all_vol_ng_src(json_obj)]

@fail_fast_dec()
def _test_vol_ng(url: str) -> CheckResult:
    accessor = HttpAccessor(url)
    io = get_IO_for_existing_dataset(accessor)
    if NG_QUICK_CHECK:
        return [io.info]

    scales = io.info.get("scales", [])
    assert len(scales) > 0, f"scales len need to be > 0"

    # try to get up to 5 random contiguous scales
    idx = math.floor(random() * len(scales))
    lower = max(0, idx - NG_LEVELS)
    higher = min(len(scales), idx + NG_LEVELS + 1)

    # for each selected scale, calculate lower bound and upper bound, based on NG_CHUNKS_MAX_LEVEL
    x, y, z = random(), random(), random()
    resolution = scales[lower].get("resolution")
    size = scales[lower].get("size")
    size_nm = np.array(resolution) * np.array(size)
    pos_nm = np.array(size_nm * np.array([x, y, z]), dtype=np.uint64)

    chunks_per_dim = math.pow(NG_CHUNKS_MAX_LEVEL, 1/3)
    delta_voxels = np.array(scales[lower].get("chunk_sizes")[0]) * (chunks_per_dim / 2)
    delta_nm: np.ndarray = delta_voxels * resolution

    start_nm = pos_nm - delta_nm
    end_nm = pos_nm + delta_nm

    all_requests = []

    for idx in range(lower, higher):
        scale = scales[idx]
        res = np.array(scale.get("resolution"))
        chunk_sizes = np.array(scale.get("chunk_sizes")[0])

        grid_aligned_start_vox = np.maximum([0 ,0, 0], start_nm / res // chunk_sizes * chunk_sizes).astype(np.uint64)
        grid_aligned_end_vox = np.minimum(scale.get("size"), np.ceil(end_nm / res / chunk_sizes) * chunk_sizes).astype(np.uint64)


        start_end_chunk_size = [val for val in zip(
            grid_aligned_start_vox.tolist(),
            grid_aligned_end_vox.tolist(),
            chunk_sizes
        )]

        x_tuples, y_tuples, z_tuples = (
            zip(
                 [v for v in range(start, end, chunk_size)],
                 [*[v for v in range(start, end, chunk_size)][1:], end],
             )
             for start, end, chunk_size in start_end_chunk_size)

        
        for x_t, y_t, z_t in product(x_tuples, y_tuples, z_tuples):
            all_requests.append((scale.get("key"), (*x_t, *y_t, *z_t)))
    
    def fetch_chunk_proxy(req):
        key, chunk_coords = req
        accessor.fetch_chunk(key, chunk_coords)

    with ThreadPoolExecutor(max_workers=6) as ex:
        return [v for v in tqdm(
            ex.map(
                fetch_chunk_proxy,
                all_requests
            ),
            total=len(all_requests)
        )]
        

def foo_test_vol_ngs(urls: list[str]) -> list[CheckResult]:
    with ThreadPoolExecutor() as ex:
        return [v for v in tqdm(
            ex.map(
                _test_vol_ng,
                urls
            ),
            total=len(urls)
        )]

    