import os
import requests
import pytest
from itertools import product
from tempfile import NamedTemporaryFile
import nibabel as nib
import numpy as np

base_url=os.getenv('SIIBRA_API_E2E_BASE_URL', 'http://localhost:8000').rstrip("/")

MNI152_ID="minds/core/referencespace/v1.0.0/dafcffc5-4826-4bf1-8ff6-46b8a31ff8e2"
COLIN_ID="minds/core/referencespace/v1.0.0/7f39f7be-445b-47c0-9791-e971c0b6d992"

JBA_29_ID="minds/core/parcellationatlas/v1.0.0/94c1125b-b87e-45e4-901c-00daee7f2579-290"
JBA_30_ID="minds/core/parcellationatlas/v1.0.0/94c1125b-b87e-45e4-901c-00daee7f2579-300"

HOC1_RIGHT="Area hOc1 (V1, 17, CalcS) - right hemisphere"
FP1_RIGHT="Area Fp1 (FPole) - right hemisphere"

STATISTIC_ENDPOINT="/v3_0/map/statistical_map.nii.gz"
LABELLED_ENDPOINT="/v3_0/map/labelled_map.nii.gz"

args = product(
    (MNI152_ID, COLIN_ID),
    (JBA_29_ID, JBA_30_ID),
    (HOC1_RIGHT, FP1_RIGHT, None)
)

@pytest.fixture
def tmp_named_file():
    tmp_file = NamedTemporaryFile(suffix=".nii.gz", delete=False)
    yield tmp_file
    os.unlink(tmp_file.name)
    

@pytest.mark.parametrize("space_id,parc_id,region_name", args)
def test_get_map(space_id,parc_id,region_name,tmp_named_file):

    query_param = {
        'space_id': space_id,
        'parcellation_id': parc_id,
    }

    if region_name:
        query_param['region_id'] = region_name

    response = requests.get(f"{base_url}{LABELLED_ENDPOINT}", params=query_param)
    response.raise_for_status()
    tmp_named_file.write(response.content)
    tmp_named_file.close()
    nii = nib.load(tmp_named_file.name)
    assert nii

    unique_elements = np.unique(nii.get_fdata()).tolist()
    if region_name:
        assert len(unique_elements) == 2
    else:
        assert len(unique_elements) > 2

map_shape_args = product(
    ((MNI152_ID, (193, 229, 193)),),
    (JBA_29_ID,),
    (STATISTIC_ENDPOINT, LABELLED_ENDPOINT),
    (HOC1_RIGHT, FP1_RIGHT, None),
)


@pytest.mark.parametrize('space_shape,parc_id,map_endpoint,region_name', map_shape_args)
def test_map_shape(space_shape,parc_id,map_endpoint,region_name, tmp_named_file):
    if region_name is None and map_endpoint == STATISTIC_ENDPOINT:
        assert True
        return
    space_id, expected_shape = space_shape
    query_param = {
        'space_id': space_id,
        'parcellation_id': parc_id,
    }

    if region_name:
        query_param['region_id'] = region_name

    response = requests.get(f"{base_url}{map_endpoint}", params=query_param)
    response.raise_for_status()
    tmp_named_file.write(response.content)
    tmp_named_file.close()
    nii = nib.load(tmp_named_file.name)
    assert nii
    assert nii.get_fdata().shape == expected_shape, f"{nii.get_fdata().shape}, {expected_shape}, {region_name}, {map_endpoint}, {space_id}"
