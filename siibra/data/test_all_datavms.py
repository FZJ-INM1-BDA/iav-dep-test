from tempfile import TemporaryDirectory
from pathlib import Path
import os
import requests
import tarfile
from urllib.parse import ParseResult
import time

from .util.ng_volume import get_neuroglancer_src, foo_test_vol_ngs
from .util.common import url_atlas_vm, CheckResult, pluck_by_host, get_all_mirrors
from .util.static import get_static_files, test_static_file
from .util.ng_mesh import get_neuroglancer_surf_src, foo_test_surf_ngs

GITLAB_ROOT = os.getenv("GITLAB_ROOT", "https://jugit.fz-juelich.de")
GITLAB_PROJECT_ID = os.getenv("GITLAB_PROJECT_ID", "3484")
GITLAB_REF_TAG = os.getenv("GITLAB_REF_TAG", "master")
DETAIL_FLAG = os.getenv("DETAIL_FLAG")
RUN_ID = int(os.getenv("RUN_ID", "0"))
PLUCK_NUM = int(os.getenv("PLUCK_NUM", "2"))
NG_PROFILE_FILE_TO_WRITE = os.getenv("NG_PROFILE_FILE_TO_WRITE")


profile_txt = """# HELP ng_src_profile_response_time average response in ms
# TYPE ng_src_profile_response_time gauge
# HELP ng_src_profile_error if the profile returns error. 0 for normal operation, 1 for error.
# TYPE ng_src_profile_error gauge"""


def write_labels(t_results: list[tuple[ParseResult, CheckResult]]):
    if not NG_PROFILE_FILE_TO_WRITE:
        print("NG_PROFILE_FILE_TO_WRITE not defined, will not try to write to profile")
        return
    file_to_write = Path(NG_PROFILE_FILE_TO_WRITE)
    current = file_to_write.read_text() if file_to_write.is_file() else profile_txt
    
    def get_time_stamp():
        return round(time.time() * 1e3)
    
    RESPONSE_TIME_LABEL_FORMAT = 'data_vm_profile_response_time{{hostname="{hostname}",path="{path}"}}'

    def write_latency_label(url_obj: ParseResult, value: float):
        """Write latency label
        
        Args:
            value: float average reponse time in ms"""

        nonlocal current
        label = RESPONSE_TIME_LABEL_FORMAT.format(hostname=url_obj.hostname, path=url_obj.path)

        lines = current.split("\n")
        lines = [line for line in lines if label not in line]
        lines = [*lines, f"{label} {value} {get_time_stamp()}" ]
        current = "\n".join(lines)
        

    ERROR_LABEL_FORMAT = 'data_vm_profile_error{{hostname="{hostname}",path="{path}"}}'

    def write_error_label(url_obj: ParseResult, value: float):
        """Write error label
        
        Args:
            value: float 0 for normal operation, 1 for error"""
        
        nonlocal current
        label = ERROR_LABEL_FORMAT.format(hostname=url_obj.hostname, path=url_obj.path)

        lines = current.split("\n")
        lines = [line for line in lines if label not in line]
        lines = [*lines, f"{label} {value} {get_time_stamp()}"]
        current = "\n".join(lines)


    for url_obj, result in t_results:
        if result.error is not None:
            result.perf_ns
            write_latency_label(url_obj, 0)
            write_error_label(url_obj, 1.0)
            return
        write_latency_label(url_obj, result.perf_ns / 1e6 / len(result.fn_return))
        write_error_label(url_obj, 0.0)
    
    file_to_write.write_text(current)
            

def test_all_datasources():
    static_file_urls: list[ParseResult] = []
    volumetric_ng: list[ParseResult] = []
    surface_mesh_ng: list[ParseResult] = []

    with TemporaryDirectory() as tmpdir:
        resp = requests.get(f"{GITLAB_ROOT}/api/v4/projects/{GITLAB_PROJECT_ID}/repository/archive.tar.gz?reftag={GITLAB_REF_TAG}")
        resp.raise_for_status()
        
        tar_file = Path(tmpdir) / "archive.tar.gz"
        with open(tar_file, "wb") as fp:
            fp.write(resp.content)

        tar = tarfile.open(tar_file, "r:gz")
        
        unbundled_dir = Path(tmpdir) / "_dir"
        unbundled_dir.mkdir()

        tar.extractall(unbundled_dir)

        for dirpath, dirnames, filenames in os.walk(unbundled_dir):
            for filename in filenames:
                if not filename.endswith(".json"):
                    continue

                static_file_urls.extend([
                    v
                    for parsed_result in pluck_by_host(
                        get_static_files(Path(dirpath) / filename),
                        RUN_ID * PLUCK_NUM,
                        PLUCK_NUM,
                    )
                    for v in get_all_mirrors(parsed_result)]
                )

                volumetric_ng.extend([
                    v
                    for parsed_result in pluck_by_host(
                        get_neuroglancer_src(Path(dirpath) / filename),
                        RUN_ID * PLUCK_NUM,
                        PLUCK_NUM
                    )
                    for v in get_all_mirrors(parsed_result)]
                )

                surface_mesh_ng.extend([
                    v
                    for parsed_result in pluck_by_host(
                        get_neuroglancer_surf_src(Path(dirpath) / filename),
                        RUN_ID * PLUCK_NUM,
                        PLUCK_NUM
                    )
                    for v in get_all_mirrors(parsed_result)]
                )
    
    check_results: list[tuple[ParseResult, CheckResult]] = []

    check_results.extend(
        zip(
            static_file_urls,
            test_static_file([ url.geturl() for url in static_file_urls ])
        )
    )
    check_results.extend(
        zip(
            volumetric_ng,
            foo_test_vol_ngs([ url.geturl() for url in volumetric_ng ])
        )
    )
    check_results.extend(
        zip(
            surface_mesh_ng,
            foo_test_surf_ngs([ url.geturl() for url in surface_mesh_ng ])
        )
    )

    error_results = [r for r in check_results if r.error is not None]

    errmsg = f"{len(error_results)} / {len(check_results)} failed."
    if DETAIL_FLAG:
        errmsg = "\n".join([f"{r.test} Failed: {r.error}"
                            for r in error_results])
    write_labels(check_results)
    assert len(error_results) == 0, errmsg
