from app.lib.mysql_queries import QUERY_SELECT_FILTERED_RAW_DATA

from litestar.datastructures import State, ImmutableState
from litestar.serialization import encode_json
import aiomysql

from asyncio import sleep
import ctypes
import logging

logger = logging.getLogger("app")

class EventConfig:
  def __init__(self, event_config):
    # assert(event_config & {"car", "minimum_timestamp", "maximum_timestamp", "sensors"})
    self.car_name = event_config["car_name"]
    self.minimum_timestamp = event_config["minimum_timestamp"]
    self.maximum_timestamp = event_config["maximum_timestamp"]
    self.can_ids = list(event_config["sensors"])
    self.sensor_config = event_config["sensors"]
    

class EventDataStreamer:
  def __init__(self, pool: aiomysql.Pool, event_config: EventConfig):
    self._pool = pool
    self._event_config = event_config
    
    self._maximum_retrieved_id: int = 0
    
  def __aiter__(self) -> "EventDataStreamer":
    return self
  
  async def __anext__(self) -> bytes:
    await sleep(1)
    rows = await self._select_rows()
    result = self._process_rows(rows) if rows else {}
    return encode_json(result)
    
  async def _select_rows(self) -> list[tuple[any, ...]]:
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
    
  def _process_rows(self, rows: list[tuple[any, ...]]) -> dict[str, str]:
    self._maximum_retrieved_id = rows[0][0]
    
    output = {}
    for row in rows:
      # Process rows of data here into the desirable JSON output
      # Probably should create a function within the class that takes input
      
      # Here below some example code of what value is what
      # row_id = row[0]
      # can_id = row[1]
      # value = row[2]
      # timestamp = row[3]
      
      
      
      # if can_id in row_by_can_id:
      #   row_by_can_id[can_id].append((row_id, value, timestamp))
      # else:
      #   row_by_can_id[can_id] = [(row_id, value, timestamp)]
    
    # Return your JSON output here
    return {"1": "abc"}

def _process_can_data_to_sensor_values(self, can_data: tuple[any, ...]) -> dict[str, any]:
  # row_id = row[0]
  can_id: str = str(row[1])
  cvalue: ctypes.c_uint64 = ctypes.c_uint64(row[2])
  timestamp: str = row[3]
  
  output = {}
  if can_id_str in self._event_config.sensor_config:
    configs: list[dict[str, any]] = self._event_config.sensor_config[can_id]
    for config in configs:
      bit_offset: int = config["byte_offset"] * 8
      bit_width: int = config["byte_width"] * 8
      signed: bool = config["signed"]
      
      shift_right_n: int = 64 - bit_width + bit_offset
      sensor_value: int = (cvalue.value << bit_offset) >> shift_right_n
      # implement here shit like signed or unsigned, then multiply by multiplier and add offset
      
      
      
      
      
  return output
      
    
  