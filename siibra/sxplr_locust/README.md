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