import sys
from pathlib import Path
import click

import requests

from decode_sxplr import decode_url

local_path_to_cfg = "/home/xiao/dev/projects/siibra-configurations"
test_url = "https://atlases.ebrains.eu/viewer-dev/#/a:juelich:iav:atlas:v1.0.0:1/t:minds:core:referencespace:v1.0.0:a1655b99-82f1-420f-a3c2-fe80fd4c8588/p:minds:core:parcellationatlas:v1.0.0:94c1125b-b87e-45e4-901c-00daee7f2579-290/@:0.0.0.-W000..2ySRwJ.-JEZC.2-6JJv.2y_ly2..DMVW..2A4ai.1zz_Q.18r7c..9Gf/vs:v2-33011b02"

saneurl_tmpl="https://data-proxy.ebrains.eu/api/v1/buckets/interactive-atlas-viewer/saneUrl/{saneurl}.json"

@click.command()
@click.option("--scfg", help="Path or commitish of siibra configuration to use", default=local_path_to_cfg or "master")
@click.argument("url", default=test_url or "bigbrainlayers")
def main(scfg: str, url: str):
    """url can be url (starting with https://) or saneurl shortcode (https://data-proxy.ebrains.eu/interactive-atlas-viewer?prefix=saneUrl%2F) (e.g. bigbrainlayers)"""
    if not url.startswith("http"):
        resp = requests.get(saneurl_tmpl.format(saneurl=url))
        resp.raise_for_status()
        resp_json = resp.json()
        url = resp_json.get("value", {}).get("hashPath")
        assert url is not None, f"malformed json {resp_json}"

    space_id, parc_id, pos, zoom = decode_url(url)

    # check path is directory
    conf_path = Path(scfg)
    if not conf_path.is_dir():
        raise NotImplementedError(f"commitsh not yet implemented")
    
    

if __name__ == "__main__":
    main()
