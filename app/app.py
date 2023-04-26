from app.lib.mysql_queries import QUERY_SELECT_FILTERED_RAW_DATA

from litestar import Litestar, MediaType, get, post
from litestar.datastructures import State, ImmutableState
from litestar.logging.config import LoggingConfig
from litestar.static_files.config import StaticFilesConfig
from litestar.contrib.jinja import JinjaTemplateEngine
from litestar.response_containers import Template
from litestar.template.config import TemplateConfig
import logging
import aiomysql
import aiofiles

import json
from pathlib import Path

logger = logging.getLogger("web-server-racing-data-analysis")

async def before_startup_handler(app_instance: Litestar) -> None:
  logger.info("Connecting to MySQL database...")
  app_instance.state.pool = await aiomysql.create_pool(
    host="162.241.244.103", port=3306, 
    user="regtersc_webserver", password="BroodjeKaas",
    db="regtersc_data_test"
  )
  
  logger.info("Loading current event...")
  event_file_path = Path(app_instance.url_for_static_asset("static", "json/event.json"))
  async with aiofiles.open(event_file_path, mode='r') as event_file:
    app_instance.state.event_data = json.load(await event_file.read())
    

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
async def post_event(state: ImmutableState, data: dict[str, str]) -> dict[str, str]:
  assert("minimum_id" in data)
  
  async with pool.acquire() as conn:
        cur = await conn.cursor()
        await cur.execute(QUERY_SELECT_FILTERED_RAW_DATA, )
        
        
  return data

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
      "web-server-racing-data-analysis": {
          "propagate": False,
          "level": "INFO",
          "handlers": ["queue_listener"],
      }
    }
  )
)