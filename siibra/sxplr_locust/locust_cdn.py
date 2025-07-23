from concurrent.futures import ThreadPoolExecutor

from locust import HttpUser, task

exceptions = (
    "https://stackpath",
    "https://cdn.plot.ly"
)

white_list = (
    "neuroglancer.humanbrainproject.eu",
)
server_mapping = {
    "neuroglancer.humanbrainproject.eu": "neuroglancer-test-vm.examcopedia.club"
}

def replace_url(url: str):
    remap_flag = False
    for key, remapped in server_mapping.items():
        if key in url:
            url = url.replace(key, remapped)
            remap_flag = True
    return url if remap_flag else None
    

with open("siibra/sxplr_locust/bigbrain.txt", "r") as fp:
    urls_txt = fp.read()
urls = [replace_url(u)
        for u in urls_txt.split("\n")
        if replace_url(u)]

class HelloWorldUser(HttpUser):

    @task
    def bigbrain_zoomin(self):
        def get(url: str):
            resp = self.client.get(url)
            return resp.content
        with ThreadPoolExecutor(max_workers=6) as ex:
            list(
                ex.map(
                    get,
                    urls
                )
            )