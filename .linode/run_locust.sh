apt update
apt install -y python3-pip python3.12-venv
git clone https://github.com/FZJ-INM1-BDA/iav-dep-test.git
cd iav-dep-test \
    && python3 -m venv venv/ \
    && . venv/bin/activate \
    && pip install -r siibra/sxplr_locust/requirements.txt \
    && locust --host https://atlases.ebrains.eu \
        --headless \
        --run-time 60s \
        --users 1 \
        --csv locust_output/output \
        --json-file locust_output/output \
        --skip-log \
        -f siibra/sxplr_locust/ 