
if [[ -z "$LINODE_TOKEN" ]]
then
    echo "LINODE_TOKEN envvar must be set"
    exit 1
fi

if [[ -z "$LINODE_ID" ]]
then
    echo "LINODE_ID envvar must be set"
    exit 1
fi

curl --request DELETE \
    --fail-with-body \
    -H "Authorization: Bearer $LINODE_TOKEN" \
    --url https://api.linode.com/v4/linode/instances/$LINODE_ID \
    --header 'accept: application/json'
    
if [[ "$?" != "0" ]]
then
    echo "Deprovision linode failed"
    exit 1
fi
