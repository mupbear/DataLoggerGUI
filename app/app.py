from litestar import Litestar, get, MediaType

html_hello_world = """
<html>
    <head>
        <title>Some HTML in here</title>
    </head>
    <body>
        <h1>Keeping the tradition alive with hello world.</h1>
    </body>
</html>
"""

@get("/", media_type=MediaType.HTML)
def hello_world() -> str:
    return html_hello_world


app = Litestar(route_handlers=[hello_world])