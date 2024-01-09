import os
import pytest
import requests

SIIBRA_EXPLORER_ENDPOINT = os.getenv("SIIBRA_EXPLORER_ENDPOINT")

def test_explorer():
    if not SIIBRA_EXPLORER_ENDPOINT:
        raise Exception("envvar SIIBRA_EXPLORER_ENDPOINT needs to be set")
    # TODO trailing slash to prevent circular redirect
    resp = requests.get(f"{SIIBRA_EXPLORER_ENDPOINT.rstrip('/')}/")
    resp.raise_for_status()
