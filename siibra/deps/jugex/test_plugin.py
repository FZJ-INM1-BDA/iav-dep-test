import os
import requests

ENDPOINT = os.getenv("SIIBRA_DEPS_JUGEX_ENDPOINT", "https://siibra-jugex.apps.tc.humanbrainproject.eu")

def test_plugin_html():
    resp = requests.get(f"{ENDPOINT}/viewer_plugin/manifest.json")
    resp.raise_for_status()
    resp_json = resp.json()
    assert resp_json.get("siibra-explorer"), f"key siibra-explorer is expected, but not found in {resp_json}"
    assert resp_json.get("iframeUrl"), f"key iframeUrl is expected, but not found in {resp_json}"
    iframe_url = resp_json.get("iframeUrl")

    resp = requests.get(f"{ENDPOINT}/viewer_plugin/{iframe_url}")
    resp.raise_for_status()
    resp_text = resp.text
    assert "html" in resp_text
