apt update
apt install -y python3-pip python3.12-venv
git clone https://github.com/FZJ-INM1-BDA/iav-dep-test.git

# https://community.cloudflare.com/t/cloudflares-chain-root-ca-removed-from-todays-certifi-update/792978

cd iav-dep-test \
    && python3 -m venv venv/ \
    && . venv/bin/activate \
    && pip install certifi==2025.1.31 \
    && pip install -r siibra/sxplr_locust/requirements.txt \
    && curl 'https://neuroglancer-test-vm.examcopedia.club/precomputed/BigBrainRelease.2015/8bit/info' \
    && python -c "import requests; resp = requests.get('https://neuroglancer-test-vm.examcopedia.club/precomputed/BigBrainRelease.2015/8bit/info'); resp.raise_for_status(); print(resp.json())" \
    && locust --host https://atlases.ebrains.eu \
        --headless \
        --run-time 60s \
        --users 1 \
        --csv locust_output/output \
        --json-file locust_output/output \
        --skip-log \
        -f siibra/sxplr_locust/locust_no_cdn.py

# certifi==2025.1.31