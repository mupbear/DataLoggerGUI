from app.lib.mysql_queries import QUERY_SELECT_FILTERED_RAW_DATA

from litestar.datastructures import State, ImmutableState
from litestar.serialization import encode_json
import aiomysql

from asyncio import sleep
import logging

logger = logging.getLogger("app")

class EventConfig:
  def __init__(self, event_config):
    # assert(event_config & {"car", "minimum_timestamp", "maximum_timestamp", "sensors"})
    self.car_name = event_config["car_name"]
    self.minimum_timestamp = event_config["minimum_timestamp"]
    self.maximum_timestamp = event_config["maximum_timestamp"]
    self.can_ids = list(event_config["sensors"])
    self.sensor_config_by_can_id = event_config["sensors"]
    

class EventDataStreamer:
  def __init__(self, pool: aiomysql.Pool, event_config: EventConfig):
    self._pool = pool
    self._event_config = event_config
    
    self._maximum_retrieved_id: int = 0
    
  def __iter__(self):
    return self
  
  async def __next__(self) -> dict[str, str]:
    await sleep(1)
    rows = await self.select_rows()
    result = process_rows(rows) if rows else {}
    yield encode_json(result)
    
  async def select_rows(self) -> list[tuple[any, ...]]:
    async with self._pool.acquire() as conn:
      cur = await conn.cursor()
      await cur.execute(
        QUERY_SELECT_FILTERED_RAW_DATA, 
        (self._maximum_retrieved_id,
          self._event_config.car_name,
          self._event_config.minimum_timestamp,
          self._event_config.maximum_timestamp,
          self._event_config.can_ids)
      )
      
      return await cur.fetchall()
    
  def process_rows(self, rows: list[tuple[any, ...]]) -> dict[str, str]:
    logger.info(f"First row ID: {rows[0][0]}")
    logger.info(f"Second row ID: {rows[0][0]}")
    logger.info("First row ID should always be highest")
    self._maximum_retrieved_id = rows[0][0]
    
    row_by_can_id = {} 
    for row in rows:
      row_id = row[0]
      can_id = row[1]
      value = row[2]
      timestamp = row[3]
      
      if can_id in row_by_can_id:
        row_by_can_id[can_id].append((row_id, value, timestamp))
      else:
        row_by_can_id[can_id] = [(row_id, value, timestamp)]
    logger.info(row_by_can_id)
    
    return {}