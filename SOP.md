# Standard Operation Procedures

In general, if the service has tag `[ebrains services]`, it often needs to be escalated to ebrains base service/infra team. If it is tagged `[siibra-*]` it usually means we are responsible for it.

## `[ebrain services]`

### `[ebrain services] [30min] DOI Redirect`

Checks if DOI `https://doi.org/10.25493/WRCY-8Z1` resolves to return a page containing the text `Probabilistic cytoarchitectonic map of Area hIP7 (IPS)`

On repeated failures: Contact ebrains DOI base service team (Oli Schmid?) about DOI redirect.

### `[ebrain services] [10min] OAuth v2`

Checks if OIDC endpoint is responsive.

On repeated failures: Contact ebrains IAM base service team (Axel Messeni ?) about IAM offline.

### `[ebrains services] [10min] OIDC service account`

Checks if a valid token can be retrieved from the OIDC endpoint.

On repeated failures: Contact ebrains IAM base service team (Axel Messeni ?) about IAM offline.

### `[siibra-api] [10min]`

Checks v1, v2 and v3 of the endpoint. For v3 endpoint, check both cache and no-cache. Actual test cases, please see <siibra/api/>. Check which version failed.

On repeated v1 failures: delete v1 pod with

```sh
kubectl delete pod -l app=siibra-api-v1 -n siibra-api
```

On repeated v2 fail: delete v2 pod with

```sh
kubectl delete pod -l app=siibra-api-v2 -n siibra-api
```

On repeated v3 set ignore-cache flag call fail: 

Probably not a huge deal, since failed call to HTTP is not cached. Normally, users will get a cached version. But should be investigated and addressed when possible.

On repeated v3 regular call failure ... (TBD)

### `[siibra-data] [10min]`

Check the reachability of all of the data VMs (neuroglancer.humanbrainproject.eu, data-proxy.ebrains.eu, 1um.brainatlas.eu). Also attempts to upload the latency to data-proxy.

On repeated failure: check which part failed:

- download existing metric: contact ebrains data-proxy base service team

- data vm unreachable:

    - `neuroglancer.humanbrainproject.eu`: Check neuroglancer data VM health (Only Xiao has access at the moment)

    - `1um.brainatlas.eu`: Check the many `1um.brainatlas.eu` services. 

    - `data-proxy.ebrains.eu`: contact ebrains data-proxy base team

- upload metric failed: contact ebrains data-proxy base service team

### `[siibra-explorer] [10min]`

Checks reachability of viewer, saneurl reachability.

On repeated failure: check which part failed:

- if viewer is unreachable restart siibra-explroer server with

```sh
kubectl get pod -l app.kubernetes.io/instance=prod -n siibra-explorer
```

- if saneurl is unreachable (likely data-proxy is offline): contact ebrains data-proxy base service team

### `[siibra-dep] [10min]`

Checks misc services which siibra-explorer/api/python interacts with:

- spatial-backend (reallly should not happen. Never have I once seen this service going offline):

Attempts

```sh
kubectl delete pod -l app.kubernetes.io/instance=prod -n siibra-spatial-backend
```

- siibra-jugex (reallly should not happen. Never have I once seen this service going offline):


```sh
kubectl delete pod -l app.kubernetes.io/instance=jugex -n siibra-toolbox
```

n.b. we need more resources on this specific namespace. As such, deleting and recreating pods may not work.

- sxplr-plugin: (reallly should not happen. Never have I once seen this service going offline):

Tests that both of the plugins respond with the manifest.json that siibra-explorer expects. If fails, likely the server needs to be restarted.

```sh
kubectl delete pod -l role=server -n siibra-toolbox
```

n.b. we need more resources on this specific namespace. As such, deleting and recreating pods may not work.