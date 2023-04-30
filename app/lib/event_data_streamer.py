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
    #logger.info({encode_json(result)})
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
      sensor_values, timestamp = self._process_can_data_to_sensor_values_and_timestamp(row)
      # Process sensor values here into the desirable JSON output     
      for sensor_unit, (value, sensor_name) in sensor_values.items():
            if sensor_unit not in output:
                output[sensor_unit] = {}

            if sensor_name not in output[sensor_unit]:
                output[sensor_unit][sensor_name] = []  

            output[sensor_unit][sensor_name].append({"timestamp": timestamp, "value": value}) 
    
    # Return your desirable JSON output here 
    return output

  def _process_can_data_to_sensor_values_and_timestamp(self, row: tuple[any, ...]) -> tuple[dict[str, tuple[str, str]], str]:
    # row_id = row[0]
    can_id: str = str(row[1])
    cvalue: ctypes.c_uint64 = ctypes.c_uint64(row[2])
    timestamp: str = row[3]
    
    value_and_unit_by_sensor_name: dict[str, tuple[str, str]] = {}
    if can_id in self._event_config.sensor_config:
      configs: list[dict[str, any]] = self._event_config.sensor_config[can_id]
      for config in configs:
        bit_offset: int = config["byte_offset"] * 8 # should probably just change byte_offset to bit_offset in the event_config.json
        bit_width: int = config["byte_width"] * 8 # should probably just change byte_width to bit_width in the event_config.json
        signed: bool = config["signed"]
        
        shift_right_n: int = 64 - bit_width - bit_offset # 64 because we first cast the number to 64-bit ctypes.c_uint64
        sensor_value: int = int(cvalue.value) >> int(shift_right_n) & int(2**bit_width - 1)
        sensor_value = int.from_bytes((sensor_value.to_bytes(4, byteorder='big', signed=signed)), byteorder='big', signed=signed)
        sensor_value = sensor_value * config["multiplier"] + config["offset"]
        
        #if sensor_value < config["minimum_value"] or sensor_value > config["maximum_value"]:
          #logger.error(f"Sensor config: {config} produced out of bounds sensor value: {sensor_value} from original CAN value: {cvalue.value}")

        #else:
        value_and_unit_by_sensor_name[config["unit"]] = (sensor_value, config["sensor_name"])
        
    return (value_and_unit_by_sensor_name, timestamp)
    
    