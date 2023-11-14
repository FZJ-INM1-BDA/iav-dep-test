from authlib.integrations.requests_client import OAuth2Session
import requests
import os

EBRAINS_SA_CLIENT_ID = os.getenv("EBRAINS_SA_CLIENT_ID")
EBRAINS_SA_CLIENT_SECRET = os.getenv("EBRAINS_SA_CLIENT_SECRET")
DISCOVERY_ENDPOINT = os.getenv("DISCOVERY_ENDPOINT")

scopes=["openid", "team", "roles", "group"]
expected_keys = ["expires_at", "access_token"]

def test_voluba_s2s():
    resp = requests.get(DISCOVERY_ENDPOINT)
    resp.raise_for_status()
    iam_json = resp.json()
    token_endpoint = iam_json["token_endpoint"]
    oauth2_session = OAuth2Session(EBRAINS_SA_CLIENT_ID,
                                   EBRAINS_SA_CLIENT_SECRET,
                                   scope=" ".join(scopes))
    fetch_token_resp = oauth2_session.fetch_token(token_endpoint, grant_type="client_credentials")
    for key in expected_keys:
        assert key in fetch_token_resp, f"Expecting {key} to be in resp, but was not!"
