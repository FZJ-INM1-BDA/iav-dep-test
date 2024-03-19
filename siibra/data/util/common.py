from urllib.parse import urlparse, ParseResult
from functools import wraps
from dataclasses import dataclass
import os
import time
from typing import Any
from collections import defaultdict

FAIL_FAST = os.getenv("FAIL_FAST")

@dataclass
class CheckResult:
    test: str
    error: str
    fn_return: Any=None
    perf_ns: float=None

def get_all_http_str(item) -> list[ParseResult]:
    if isinstance(item, str):
        if not item.startswith("http"):
            return []
        return [urlparse(item)]
    if isinstance(item, list):
        return [i for it in item for i in get_all_http_str(it)]
    if isinstance(item, dict):
        return [v for key in item for v in get_all_http_str(item[key])]
    if isinstance(item, (int,  float)):
        return []
    if item is None:
        return []
    raise Exception(f"cannot process {item} with type {type(item)}")

def fail_fast_dec(id_fn=None):
    def outer(fn):
        @wraps(fn)
        def inner(*args, **kwargs):
            _id = (id_fn or (lambda *args, **kwargs: f"{fn.__name__}, {args=!r}, {kwargs=!r}"))(*args, **kwargs)
            start_time = time.time_ns()
            fn_return = None
            try:
                fn_return = fn(*args, **kwargs)
                result = CheckResult(_id, None, fn_return)
            except Exception as e:
                if FAIL_FAST:
                    print(f"Failed: {_id}: {str(e)}")
                    raise e from e
                result = CheckResult(_id, str(e))
            finally:
                result.perf_ns = time.time_ns() - start_time
                return result
        return inner
    return outer

def url_atlas_vm(url: ParseResult) -> bool:
    return url.hostname == "neuroglancer.humanbrainproject.eu"

def pluck_by_host(items: list[ParseResult], idx: int, n: int=1):
    """Pick n entries per host
    
    Args:
        items: list[ParseResult]
        idx: int start index
        n: int number of items to retrieve"""
    groupby_dict: dict[str, list[ParseResult]] = defaultdict(list)
    for item in items:
        groupby_dict[item.hostname].append(item)
    
    return [item
            for items in groupby_dict.values()
            for item in items[(idx % len(items)):(idx % len(items) + n)]]

def get_all_mirrors(url_obj: ParseResult) -> list[ParseResult]:
    if url_obj.hostname == "neuroglancer.humanbrainproject.eu":
        prev_url = url_obj.geturl()
        new_url = prev_url.replace("neuroglancer.humanbrainproject.eu",
                                   "data-proxy.ebrains.eu/api/v1/buckets/reference-atlas-data")
        return [url_obj, urlparse(new_url)]
    return  [url_obj]
