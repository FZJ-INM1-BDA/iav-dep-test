import os
from pathlib import Path
import time

from util.ng_volume import get_neuroglancer_src, _test_vol_ng
from util.common import ParseResult, get_all_mirrors

NG_PROFILE_DIR_TO_CONFIG = os.getenv("NG_PROFILE_DIR_TO_CONFIG")
NG_PROFILE_FILE_TO_WRITE = os.getenv("NG_PROFILE_FILE_TO_WRITE")

if NG_PROFILE_FILE_TO_WRITE is None:
    raise Exception(f"NG_PROFILE_FILE_TO_WRITE must be defined!")


profile_txt = """# HELP ng_src_profile_response_time average response in ms
# TYPE ng_src_profile_response_time gauge
# HELP ng_src_profile_error if the profile returns error. 0 for normal operation, 1 for error.
# TYPE ng_src_profile_error gauge"""

RESPONSE_TIME_LABEL_FORMAT = 'ng_src_profile_response_time{{hostname="{hostname}",path="{path}"}}'

def get_time_stamp():
    return round(time.time() * 1e3)

def write_latency_label(url_obj: ParseResult, value: float):
    """Write latency label
    
    Args:
        value: float average reponse time in ms"""
    file_to_write = Path(NG_PROFILE_FILE_TO_WRITE)
    current = file_to_write.read_text() if file_to_write.is_file() else profile_txt

    label = RESPONSE_TIME_LABEL_FORMAT.format(hostname=url_obj.hostname, path=url_obj.path)

    lines = current.split("\n")
    lines = [line for line in lines if label not in line]
    lines = [*lines, f"{label} {value} {get_time_stamp()}" ]
    file_to_write.write_text("\n".join(lines))

ERROR_LABEL_FORMAT = 'ng_src_profile_error{{hostname="{hostname}",path="{path}"}}'

def write_error_label(url_obj: ParseResult, value: float):
    """Write error label
    
    Args:
        value: float 0 for normal operation, 1 for error"""
    file_to_write = Path(NG_PROFILE_FILE_TO_WRITE)
    current = file_to_write.read_text() if file_to_write.is_file() else profile_txt

    label = ERROR_LABEL_FORMAT.format(hostname=url_obj.hostname, path=url_obj.path)

    lines = current.split("\n")
    lines = [line for line in lines if label not in line]
    lines = [*lines, f"{label} {value} {get_time_stamp()}"]
    file_to_write.write_text("\n".join(lines))

def get_all_url_objs():
    if NG_PROFILE_DIR_TO_CONFIG is None:
        raise Exception(f"NG_PROFILE_DIR_TO_CONFIG must be populated")
    return [
        item
        for dirpath, dirnames, filenames in os.walk(NG_PROFILE_DIR_TO_CONFIG)
        for filename in filenames
        if filename.endswith(".json")
        for item in get_neuroglancer_src(Path(dirpath) / filename)
    ]

def profile_ng_src(_url_obj: ParseResult):
    url = _url_obj.geturl()
    result = _test_vol_ng(url)
    if result.error is not None:
        write_latency_label(_url_obj, 0)
        write_error_label(_url_obj, 1.0)
        return
    
    write_latency_label(_url_obj, result.perf_ns / 1e6 / len(result.fn_return))
    write_error_label(_url_obj, 0.0)

def main():
    
    url_objs = get_all_url_objs()
    for url_obj in url_objs:
        for url_obj in get_all_mirrors(url_obj):
            profile_ng_src(url_obj)

if __name__ == "__main__":
    main()
