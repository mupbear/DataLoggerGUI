from app.lib.event_data_streamer import EventConfig, EventDataStreamer

from litestar import Litestar, MediaType, get, post
from litestar.datastructures import State, ImmutableState
from litestar.logging.config import LoggingConfig
from litestar.static_files.config import StaticFilesConfig
from litestar.contrib.jinja import JinjaTemplateEngine
from litestar.response_containers import Template, Stream
from litestar.template.config import TemplateConfig
import aiomysql
import aiofiles

from pathlib import Path
import logging
import json

logger = logging.getLogger("app")

async def before_startup_handler(app_instance: Litestar) -> None:
  logger.info("Connecting to MySQL database...")
  app_instance.state.pool = await aiomysql.create_pool(
    host="162.241.244.103", port=3306, 
    user="regtersc_webserver", password="BroodjeKaas",
    db="regtersc_data_test"
  )
  
  logger.info("Loading current event config...")
  app_instance.state.event_config = None
  async with aiofiles.open("./static/json/event_config.json", mode='r') as event_config_file:
    event_config = json.loads(await event_config_file.read())
    app_instance.state.event_config = EventConfig(event_config)
  
    
async def before_shutdown_handler(app_instance: Litestar) -> None:
  logger.info("Disconnecting from MySQL database...")
  app_instance.state.pool.close()
  await app_instance.state.pool.wait_closed()

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
async def post_event(state: State, data: dict[str, str]) -> Stream:
  event_data_streamer = EventDataStreamer(pool=state.pool, event_config=state.event_config)
  return Stream(iterator=event_data_streamer)

app = Litestar(
  before_startup=[before_startup_handler],
  before_shutdown=[before_shutdown_handler],
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
      "app": {
          "propagate": False,
          "level": "INFO",
          "handlers": ["queue_listener"],
      }
    }
  )
)
