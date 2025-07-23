from concurrent.futures import ThreadPoolExecutor

from locust import HttpUser, task

exceptions = (
    "https://stackpath",
    "https://cdn.plot.ly"
)

with open("siibra/sxplr_locust/b20_0047.txt", "r") as fp:
    urls_txt = fp.read()
urls = [u
        for u in urls_txt.split("\n")
        if (
            u != ""
            or any(u.startswith(ex) for ex in exceptions)
            or not u.startswith("https")
            )]

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

# def main():
#     with open("siibra/latency/bigbrain.txt", "r") as fp:
#         urls_txt = fp.read()
#     urls = [u for u in urls_txt.split("\n") if u != ""]
#     def get(url: str):
#         resp = sess.get(url)
#         return resp.content


#     with ThreadPoolExecutor(max_workers=6) as ex:
#         all_content = list(
#             ex.map(
#                 get,
#                 urls
#             )
#         )
#         pass
#     pass

# if __name__ == "__main__":
#     main()