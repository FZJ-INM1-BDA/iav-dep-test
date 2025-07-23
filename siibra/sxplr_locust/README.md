# load stressing test

require `locust`

created and tested with version `2.37.13`

## Create fresh txt files from .har file

```
jq -r '.log.entries[].request.url' my_log.har > my_log.txt
```

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
## Sample metrics

### chunk

```sh
# no cdn
time curl -H 'Accept-Encoding: gzip' --output /dev/null 'https://neuroglancer.humanbrainproject.eu/precomputed/BigBrainRelease.2015/8bit/320um/192-256_128-192_192-256'
```


```sh
# cdn
time curl -H 'Accept-Encoding: gzip' --output /dev/null 'https://neuroglancer-test-vm.examcopedia.club/precomputed/BigBrainRelease.2015/8bit/320um/192-256_128-192_192-256'
```

fzj: 0m0.098s
fzj (cdn): 0m0.156s

ap-southeast: 0m2.193s
ap-southeast (cdn): 0m0.053s