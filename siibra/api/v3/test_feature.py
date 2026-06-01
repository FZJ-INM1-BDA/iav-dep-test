import os

import pytest

from .util import Session

f_ids = [
    pytest.param("73c1fa55-d099-4854-8cda-c9a403c6080a--bc6303052d2ac68fd147e0a4692b4897", id="1um #549"),
]

base_url=os.getenv('SIIBRA_API_E2E_BASE_URL', 'http://localhost:5000')
sess = Session(base_url=base_url)

@pytest.mark.parametrize("feature_id", f_ids)
def test_get_single_feature_detail(feature_id: str):
    resp = sess.get(f'/v3_0/feature/{feature_id}')
    assert resp.status_code == 200
