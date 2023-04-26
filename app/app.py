from litestar import Litestar, MediaType, get, post
from litestar.logging.config import LoggingConfig
from litestar.static_files.config import StaticFilesConfig
from litestar.contrib.jinja import JinjaTemplateEngine
from litestar.response_containers import Template
from litestar.template.config import TemplateConfig

from pathlib import Path

@get("/", media_type=MediaType.HTML, cache=False)
async def get_root() -> Template:
  return Template(
    name="root.html.jinja2",
    context={"title": "Home"},
  )

@get("/event", media_type=MediaType.HTML, cache=False)
async def get_event() -> Template:
  return Template(
    name="event.html.jinja2",
    context={"title": "Racing Event Analysis"},
  )

@post("/event", media_type=MediaType.JSON)
def post_event(data: dict[str, str]) -> dict[str, str]:
  print(data)
  return data

app = Litestar(
    route_handlers=[get_root, get_event, post_event],
    template_config=TemplateConfig(
        directory=Path("templates"),
        engine=JinjaTemplateEngine,
    ),
    static_files_config=[
        StaticFilesConfig(directories=[Path("static")], path="/static", name="static")
    ],
    logging_config=LoggingConfig(
      loggers={
          "web-server-racing-data-analysis": {
              "level": "INFO",
              "handlers": ["queue_listener"],
          }
      }
    )
)