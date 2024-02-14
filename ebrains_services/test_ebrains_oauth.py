import os
import pytest
import requests
from dataclasses import dataclass

@dataclass
class OIDC:
    client_id: str
    redirect_uri: str
    scope: str
    url: str

oidc_clients = (
    OIDC(
        os.getenv("OAUTH_V2_CLIENT_ID"),
        os.getenv("OAUTH_V2_REDIRECT_URL"),
        os.getenv("OAUTH_V2_SCOPES"),
        os.getenv("OAUTH_V2_ENDPOINT"),
    ),
    OIDC(
        os.getenv("VOLUBA_OAUTH_V2_CLIENT_ID"),
        os.getenv("VOLUBA_OAUTH_V2_REDIRECT_URL"),
        os.getenv("VOLUBA_OAUTH_V2_SCOPES"),
        os.getenv("VOLUBA_OAUTH_V2_ENDPOINT"),
    )
)

@pytest.mark.parametrize("oidc_client", oidc_clients)
def test_oidc(oidc_client: OIDC):
    resp = requests.get(oidc_client.url, params={

        "client_id": oidc_client.client_id,
        "redirect_uri": oidc_client.redirect_uri,
        "scope": oidc_client.scope,
        "url": oidc_client.url,
    }, allow_redirects=False)
    resp.raise_for_status()
