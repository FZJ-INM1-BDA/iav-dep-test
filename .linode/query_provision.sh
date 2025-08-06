if [[ -z "$LINODE_TOKEN" ]]
then
    echo "LINODE_TOKEN envvar must be set"
    exit 1
fi

# eu-central
if [[ -z "$LINODE_ID" ]]
then
    echo "LINODE_ID envvar must be set"
    exit 1
fi

while true
do
    result=$(curl --fail-with-body \
        -H "Accept: application/json" \
        -H "Authorization: Bearer $LINODE_TOKEN" \
        https://api.linode.com/v4/linode/instances/$LINODE_ID)


    if [[ "$?" != "0" ]]
    then
        echo "Query linode failed"
        exit 1
    fi

    status=$(echo $result | jq -r '.status')

    if [[ "$status" == "running" ]]
    then
        echo "Instance running!. IPV4:"
        echo $result | jq -r '.ipv4[0]'
        exit 0
    fi

    echo "Status: $status ... retrying in 10s..."
done
