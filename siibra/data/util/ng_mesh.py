from urllib.parse import ParseResult
from concurrent.futures import ThreadPoolExecutor
import json

from tqdm import tqdm
import requests

from .common import get_all_http_str, CheckResult, fail_fast_dec

NG_SRC_PREFIX = ("neuroglancer/precompmesh/surface",)

def get_all_surf_ng_src(item) -> list[ParseResult]:
    if isinstance(item, dict):
        if any(key in NG_SRC_PREFIX for key in item):
            return [v
                    for key in item
                    if key in NG_SRC_PREFIX
                    for v in get_all_http_str(item[key])]
        return [v for key in item for v in get_all_surf_ng_src(item[key])]
    
    if isinstance(item, list):
        return [i for it in item for i in get_all_surf_ng_src(it)]
    if isinstance(item, (int,  float, str)):
        return []
    if item is None:
        return []
    raise Exception(f"cannot process {item} with type {type(item)}")

def get_neuroglancer_surf_src(file_to_json) -> list[ParseResult]:
    with open(file_to_json) as fp:
        json_obj = json.load(fp)
        return [f for f in get_all_surf_ng_src(json_obj)]
    
@fail_fast_dec()
def foo_test_surf_ng(url: str) -> CheckResult:
    splitted_url = url.split()
    assert len(splitted_url) == 2, f"surface mesh must have exactly 2 components. {url} has {len(splitted_url)}"
    url_root, index = splitted_url
    
    session = requests.Session()
    
    resp = session.get(f"{url_root}/info")
    resp.raise_for_status()

    mesh_dir = resp.json()["mesh"]
    resp = session.get(f"{url_root}/{mesh_dir}/{index}:0")
    resp.raise_for_status()

    fragments = resp.json()["fragments"]
    assert len(fragments) > 0, f"Expecting at least one fragment from, {url}, but got 0"
    for fragment in fragments:
        resp = session.get(f"{url_root}/{mesh_dir}/{fragment}", headers={
            "Range": "bytes=0-1024"
        })
        resp.raise_for_status()
        assert 200 <= resp.status_code < 300, f"status_code {resp.status_code} is abnormal"
    return [True for f in fragments]

def foo_test_surf_ngs(urls: list[str]) -> list[CheckResult]:
    with ThreadPoolExecutor() as ex:
        return [v for v in tqdm(
            ex.map(
                foo_test_surf_ng,
                urls
            ),
            total=len(urls)
        )]

    