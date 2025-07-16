
if [[ -z "$LINODE_TOKEN" ]]
then
    echo "LINODE_TOKEN envvar must be set"
    exit 1
fi

if [[ -z "$LINODE_ROOTPASS" ]]
then
    echo "LINODE_ROOTPASS envvar must be set"
    exit 1
fi

if [[ -z "$LINODE_REGION" ]]
then
    echo "LINODE_REGION envvar must be set"
    exit 1
fi


curl \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $LINODE_TOKEN" \
    -X POST -d '{
        "image": "linode/ubuntu24.04",
        "private_ip": false,
        "region": "'$LINODE_REGION'",
        "type": "g6-nanode-1",
        "label": "ubuntu-'$LINODE_REGION'",
        "root_pass": "'$LINODE_ROOTPASS'",
        "authorized_users": [
            "xgui3783"
        ],
        "disk_encryption": "disabled"
    }' https://api.linode.com/v4/linode/instances
