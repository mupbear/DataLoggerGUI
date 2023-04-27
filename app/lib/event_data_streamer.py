from app.lib.mysql_queries import QUERY_SELECT_FILTERED_RAW_DATA

from litestar.datastructures import State, ImmutableState
from litestar.serialization import encode_json
import aiomysql

from asyncio import sleep
import logging

logger = logging.getLogger("app")

class EventDataStreamer:
  def __init__(self, pool: aiomysql.Pool, car_name: str, minimum_timestamp: str, maximum_timestamp: str, event_sensors: tuple[int, ...]):
    self._pool = pool
    self._car_name = car_name
    self._minimum_timestamp = minimum_timestamp
    self._maximum_timestamp = maximum_timestamp
    self._event_sensors = event_sensors
    
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
          state.event_data["car"],
          state.event_data["minimum_timestamp"],
          state.event_data["maximum_timestamp"],
          state.event_sensors)
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