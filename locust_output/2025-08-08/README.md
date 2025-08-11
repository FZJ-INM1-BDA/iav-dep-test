# Load/Latency test

Load latency carried out on 2025.08.08.

## latency test command

```bash
export LINODE_TOKEN="your-linode-token"
export LINODE_REGION="eu-central,us-east,us-west,ap-southeast"
export LOCUST_TARGET="data-vm" #siibra-api,siibra-explorer
export TARGET_DIR=$(pwd)"/locust_output/2025-08-08/single-run-"$LOCUST_TARGET

ansible-playbook -i ansible/inventory.yml \
    -e LINODE_TOKEN=$LINODE_TOKEN \
    -e LINODE_REGION=$LINODE_REGION \
    -e LOCUST_TARGET=$LOCUST_TARGET \
    -e TARGET_DIR=$TARGET_DIR \
    ansible/playbooks/workflow.profile.playbook.yml
```

## load test command

```bash
export LINODE_TOKEN="your-linode-token"
export LINODE_REGION="eu-central"
export LOCUST_TARGET="data-vm" #siibra-api,siibra-explorer
export TARGET_DIR=$(pwd)"/locust_output/2025-08-08/multi-run-"$LOCUST_TARGET
export LINODE_MULT="8"

ansible-playbook -i ansible/inventory.yml \
    -e LINODE_TOKEN=$LINODE_TOKEN \
    -e LINODE_REGION=$LINODE_REGION \
    -e LINODE_MULT=$LINODE_MULT \
    -e LOCUST_TARGET=$LOCUST_TARGET \
    -e TARGET_DIR=$TARGET_DIR \
    ansible/playbooks/workflow.profile.playbook.yml
```
