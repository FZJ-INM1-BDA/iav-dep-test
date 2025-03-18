import os
import requests
from typing import Callable, Dict, List
from itertools import product
import pytest

ENDPOINT = os.getenv("SIIBRA_DEPS_JUGEX_ENDPOINT", "https://siibra-jugex.apps.tc.humanbrainproject.eu")

REG: Dict[str, Callable[[requests.Response], None]] = {}

def try_endpoint(path: str):
    assert path.startswith("/"), f"decorated path must start with /, but {path} does not"
    
    assert path not in REG, f"path {path} already registered"
    def outer(fn: Callable[[requests.Response], None]):
        REG[path] = fn
        return fn

    return outer

@try_endpoint("/")
@try_endpoint("/ready")
def resp_ok(resp: requests.Response):
    resp.raise_for_status()

MOCK_ROI1 = "bar"
MOCK_ROI2 = "buzz"
MOCK_GENE1 = "hello"
MOCK_GENE2 = "world"

tuple_parcellation_id=("foo", None)
tuple_roi_1=("bar", None)
tuple_roi_2=("buzz", None)
tuple_comma_delimited_genes=(f"{MOCK_GENE1},{MOCK_GENE2}", None)

all_combination = product(
    tuple_parcellation_id,
    tuple_roi_1,
    tuple_roi_2,
    tuple_comma_delimited_genes,
)

not_ok: List[str] = []
is_ok: List[str] = []

for (
    parcellation_id,
    roi_1,
    roi_2,
    comma_delimited_genes,
) in all_combination:
    to_be_appended = []
    if parcellation_id:
        to_be_appended.append(f"{parcellation_id=}")
        
    if roi_1:
        to_be_appended.append(f"{roi_1=}")
        
    if roi_2:
        to_be_appended.append(f"{roi_2=}")
        
    if comma_delimited_genes:
        to_be_appended.append(f"{comma_delimited_genes=}")
    
    if len(to_be_appended) == 4:
        is_ok.append("&".join(to_be_appended))
    else:
        not_ok.append("&".join(to_be_appended))


for nok in not_ok:
    @try_endpoint(f"/notebook/view?{nok}")
    def view_not_ok(resp: requests.Response):
        with pytest.raises(requests.HTTPError):
            resp.raise_for_status()
            
    @try_endpoint(f"/notebook/notebook?{nok}")
    def notebook_not_ok(resp: requests.Response):
        with pytest.raises(requests.HTTPError):
            resp.raise_for_status()

for ok in is_ok:
    @try_endpoint(f"/notebook/view?{ok}")
    def view_ok(resp: requests.Response):
        resp.raise_for_status()
        resptext = resp.text
        assert "html" in resptext
        
    @try_endpoint(f"/notebook/notebook?{ok}")
    def notebook_ok(resp: requests.Response):
        resp.raise_for_status()
        resptext = resp.text
        assert "html" in resptext
        for v in (
            MOCK_ROI1,
            MOCK_ROI2,
            MOCK_GENE1,
            MOCK_GENE2
        ):
            assert v in resptext, f"expected {v} to be in resptext, but was not"

@pytest.mark.parametrize("endpoint", REG.keys())
def test_url(endpoint: str):
    check_resp = REG[endpoint]
    resp = requests.get(f"{ENDPOINT}{endpoint}")
    check_resp(resp)

