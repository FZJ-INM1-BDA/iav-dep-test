import os
import requests
import pytest
from itertools import permutations
import time

endpoint = os.getenv("ENDPOINT", "https://siibra-spatial-backend.apps.tc.humanbrainproject.eu/")
print(f"[ENV] testing : {endpoint}")

endpoint = endpoint.rstrip("/") + "/v1/transform-points"

spaces = (
    "MNI 152 ICBM 2009c Nonlinear Asymmetric",
    "MNI Colin 27",
    "Big Brain (Histology)",
)

perm = list(permutations(spaces, 2))

@pytest.fixture(autouse=True)
def slowdown():
    start = time.time()
    yield
    print()
    print("used:", time.time() - start)
    # spatial transform often struggles with successive requests
    # 1 sec sleep allow the requests to be spread out

@pytest.mark.parametrize("source_space, target_space", perm)
@pytest.mark.timeout(5) # 5 sec timeout
def test_spatial_transform(source_space: str, target_space: str):
    resp = requests.post(endpoint, json={
        "source_points": [
            [-56.180688,-32,35.406444],
        ],
        "source_space": source_space,
        "target_space": target_space,
    })
    resp.raise_for_status()
