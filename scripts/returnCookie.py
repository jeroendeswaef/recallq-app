import mitmproxy.ctx
import time
import re

from mitmproxy.script import concurrent

@concurrent
def response(flow):
    match = re.search(r'get-cookie', flow.request.url)
    if match:
        # mitmproxy.ctx.log.info(flow.request.url)
        flow.response.headers["Set-Cookie"] = "id=a3fWa; Secure; HttpOnly"
        flow.response.status_code = 200