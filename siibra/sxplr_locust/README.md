# load stressing test

require `locust`

created and tested with version `2.37.13`

## How to run

```sh
locust --host https://atlases.ebrains.eu \
    --headless \
    --run-time 60s \
    --users 1 \
    --csv locust_output/output \
    --json-file locust_output/output \
    --skip-log \
    -f siibra/sxplr_locust/
```

## Automatic run

```sh
apt update
apt install python3-pip python3.12-venv
git clone https://github.com/FZJ-INM1-BDA/iav-dep-test.git
cd iav-dep-test
python3 -m venv venv/ && . venv/bin/activate
pip install -r siibra/sxplr_locust/requirements.txt
```