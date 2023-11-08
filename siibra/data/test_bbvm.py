import os
import pytest
import requests

base_url = os.getenv("SIIBRA_BBVM")

assert base_url, f"envvar SIIBRA_BBVM must be defined!"

one_um_recons = [
    "/cyto_reconstructions/ebrains_release/BB_1um/VOI_1/precomputed",
    "/cyto_reconstructions/ebrains_release/BB_1um/VOI_2/precomputed",
]

@pytest.mark.parametrize("url_path", one_um_recons)
def test_1um_recon(url_path):
    resp = requests.get(f"{base_url}{url_path}/info")
    resp.raise_for_status()
    resp_json = resp.json()
    assert "data_type" in resp_json

one_um_slices = ["0047",  "1100",  "2150",  "3305",  "4401",  "5447",  "6495",
"0102",  "1151",  "2206",  "3348",  "4449",  "5511",  "6549",
"0150",  "1205",  "2251",  "3407",  "4497",  "5550",  "6599",
"0199",  "1255",  "2313",  "3458",  "4549",  "5602",  "6647",
"0251",  "1307",  "2393",  "3500",  "4599",  "5661",  "6700",
"0300",  "1345",  "2447",  "3556",  "4651",  "5702",  "6748",
"0350",  "1402",  "2494",  "3601",  "4708",  "5745",  "6800",
"0400",  "1454",  "2560",  "3645",  "4751",  "5798",  "6853",
"0454",  "1499",  "2591",  "3698",  "4800",  "5851",  "6899",
"0500",  "1561",  "2653",  "3750",  "4844",  "5890",  "6951",
"0549",  "1600",  "2757",  "3797",  "4900",  "5943",  "7001",
"0600",  "1649",  "2803",  "3856",  "4950",  "6000",  "7050",
"0648",  "1697",  "2845",  "3905",  "5001",  "6049",  "7103",
"0700",  "1749",  "2896",  "3954",  "5048",  "6101",  "7150",
"0750",  "1801",  "2956",  "4003",  "5102",  "6152",  "7200",
"0798",  "1842",  "2999",  "4050",  "5149",  "6199",  "7250",
"0847",  "1901",  "3045",  "4100",  "5201",  "6249",  "7300",
"0900",  "1952",  "3096",  "4156",  "5252",  "6297",  "7350",
"0951",  "1998",  "3146",  "4248",  "5301",  "6350",  "7400",
"1001",  "2056",  "3196",  "4311",  "5356",  "6400",
"1049",  "2105",  "3254",  "4342",  "5401",  "6450"]

@pytest.mark.parametrize("one_micron_slice", one_um_slices)
def test_1um_slice(one_micron_slice):
    url = f"{base_url}/registered_sections/bigbrain/B20_{one_micron_slice}/precomputed/info"
    
    resp = requests.get(url)
    resp.raise_for_status()
    resp_json = resp.json()
    assert "data_type" in resp_json
