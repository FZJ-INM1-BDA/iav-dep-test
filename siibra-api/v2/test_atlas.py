import os
import json

from .util import Session

MULTILEVEL_HUMAN_ATLAS_ID='juelich/iav/atlas/v1.0.0/1'
ICBM_152_SPACE_ID = 'minds/core/referencespace/v1.0.0/dafcffc5-4826-4bf1-8ff6-46b8a31ff8e2'
INVALID_SPACE_ID = 'INVALID_SPACE_ID'

base_url=os.getenv('SIIBRA_API_E2E_BASE_URL', 'http://localhost:5000')
client = Session(base_url=base_url)

def test_get_all_atlases():
    response = client.get('/v2_0/atlases')
    assert response.status_code == 200
    result_content = json.loads(response.content)
    assert len(result_content) == 4

def test_get_single_atlases():
    response = client.get(f'/v2_0/atlases/{MULTILEVEL_HUMAN_ATLAS_ID}')
    assert response.status_code == 200
