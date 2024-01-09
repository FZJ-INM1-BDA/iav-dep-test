import os
import pytest
import requests

SIIBRA_EXPLORER_ENDPOINT = os.getenv("SIIBRA_EXPLORER_ENDPOINT")

sane_urls = [
  'mebrains',
  'allen2017',
  'whs4',
  'bigbrainGreyWhite',
  'icbm_fg1',
]

@pytest.mark.parametrize("sane_url", sane_urls)
def test_saneurl(sane_url):
    if not SIIBRA_EXPLORER_ENDPOINT:
        raise Exception("envvar SIIBRA_EXPLORER_ENDPOINT needs to be set")
    resp = requests.get(f"{SIIBRA_EXPLORER_ENDPOINT.rstrip('/')}/saneUrl/{sane_url}", headers={
        "x-noop": "1"
    })
    resp.raise_for_status()
