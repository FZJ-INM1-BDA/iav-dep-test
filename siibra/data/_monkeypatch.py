import requests
from neuroglancer_scripts.http_accessor import HttpAccessor
from neuroglancer_scripts.sharded_http_accessor import HttpShard


def _http_file_exists(self, relative_path):
    from neuroglancer_scripts.accessor import DataAccessError
    file_url = self.base_url + relative_path
    try:
        r = self._session.head(file_url)
        if r.status_code == requests.codes.not_found:
            return False
        if r.status_code == 405:  # HEAD not supported -> fall back to GET
            r = self._session.get(file_url, stream=True)
            r.raise_for_status()
            return True
        r.raise_for_status()
    except requests.exceptions.RequestException as exc:
        raise DataAccessError(
            f"Error probing the existence of {file_url}: {exc}") from exc
    return True


def _shard_file_exists(self, filepath):
    url = f"{self.base_url}{filepath}"
    resp = self._session.head(url)
    if resp.status_code in (200, 404):
        return resp.status_code == 200
    if resp.status_code == 405:
        resp = self._session.get(url, stream=True)
        return resp.status_code == 200
    resp.raise_for_status()
    return False


HttpAccessor.file_exists = _http_file_exists
HttpShard.file_exists = _shard_file_exists