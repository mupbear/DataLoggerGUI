from app.lib.event_data_streamer import EventDataStreamer

from litestar import Litestar, MediaType, get, post
from litestar.datastructures import State, ImmutableState
from litestar.logging.config import LoggingConfig
from litestar.static_files.config import StaticFilesConfig
from litestar.contrib.jinja import JinjaTemplateEngine
from litestar.response_containers import Template, Stream
from litestar.template.config import TemplateConfig
import aiomysql
import aiofiles

import json
from pathlib import Path
import logging

logger = logging.getLogger("app")

async def before_startup_handler(app_instance: Litestar) -> None:
  logger.info("Connecting to MySQL database...")
  app_instance.state.pool = await aiomysql.create_pool(
    host="162.241.244.103", port=3306, 
    user="regtersc_webserver", password="BroodjeKaas",
    db="regtersc_data_test"
  )
  
  logger.info("Loading current event...")
  async with aiofiles.open("./static/json/event.json", mode='r') as event_file:
    app_instance.state.event_data = json.loads(await event_file.read())
    assert(app_instance.state.event_data.keys() & {"car", "minimum_timestamp", "maximum_timestamp", "sensors"})
    app_instance.state.event_sensors = tuple(sensor_data["id"] for sensor_data in app_instance.state.event_data["sensors"].values())
    
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
  event_data_streamer = EventDataStreamer(
    pool=state.pool,
    car_name=state.event_data["car_name"],
    minimum_timestamp=state.event_data["minimum_timestamp"],
    maximum_timestamp=state.event_data["maximum_timestamp"],
    event_sensors=state.event_sensors
  )
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