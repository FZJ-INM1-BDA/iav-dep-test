import os
import requests
import time
import pytest

ENDPOINT = os.getenv("SIIBRA_DEPS_JUGEX_ENDPOINT", "https://siibra-jugex.apps.ebrains.eu")

@pytest.mark.timeout(60, func_only=True) # 60 sec timeout
def test_analysis():
    payload = {
        "parcellation_id": "minds/core/parcellationatlas/v1.0.0/94c1125b-b87e-45e4-901c-00daee7f2579-290",
        "roi_1": "Area Fp1 (FPole) left",
        "roi_2": "Area Fp2 (FPole) left",
        "genes": ["MAOA","TAC1"],
    }
    resp = requests.post(f"{ENDPOINT}/analysis/analysis", json=payload)
    resp.raise_for_status()
    resp_json = resp.json()
    uuid = resp_json.get("poll_url")
    assert uuid, f"expected uuid to be in {resp_json}, but was not"
    
    while True:
        time.sleep(1)
        resp = requests.get(f"{ENDPOINT}/analysis/analysis/{uuid}")
        resp.raise_for_status()
        resp_json = resp.json()
        status = resp_json.get("status")
        assert status, f"expected status to be in {resp_json}, but was not"
        if status == "PENDING":
            continue
        assert status != "FAILURE", f"failed {resp_json}"
        break

if __name__ == "__main__":
    test_analysis()
