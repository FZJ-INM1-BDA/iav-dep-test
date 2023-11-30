from urllib.parse import ParseResult
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from tqdm import tqdm
import requests

from .common import fail_fast_dec, get_all_http_str, CheckResult

STATIC_FILE_SUFFIXES = (".nii", ".gz", ".gii",)

# to filter out mcgill.ca, doi.org, etc
WHITELISTED_HOSTNAMES = ("neuroglancer.humanbrainproject.eu", "data-proxy.ebrains.eu",)

@fail_fast_dec()
def check_exist(url: str):
    resp = requests.get(url, headers={"Range": "bytes=0-1024"})
    resp.raise_for_status()
    assert 200 <= resp.status_code < 300, f"status_code {resp.status_code} is abnormal"

def get_static_files(file_to_json) -> list[ParseResult]:
    with open(file_to_json) as fp:
        json_obj = json.load(fp)
        return [f for f in get_all_http_str(json_obj)
                if (
                    Path(f.path).suffix in STATIC_FILE_SUFFIXES
                    and f.hostname in WHITELISTED_HOSTNAMES
                )]


def foo_test_static_file(urls: list[str]) -> list[CheckResult]:
    with ThreadPoolExecutor(max_workers=1) as ex:
        return [result for result in tqdm(
            ex.map(
                check_exist,
                urls
            ),
            total=len(urls)
        )]
