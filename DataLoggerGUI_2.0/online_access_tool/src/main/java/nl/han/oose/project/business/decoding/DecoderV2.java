package nl.han.oose.project.business.decoding;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.han.oose.project.presentation.dto.RaceDataDTO;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.*;

/**
 * DecoderV2 is a class responsible for decoding race data rows and processing them into a structured output.
 */
public class DecoderV2 {
     private static final Logger LOGGER = Logger.getLogger(DecoderV2.class.getName());
     private SensorConfig sensorConfig;

     /**
      * Sets the sensor configuration for the decoder.
      *
      * @param sensorConfig The sensor configuration to be set.
      */

     public void setSensorConfig(SensorConfig sensorConfig) {
          this.sensorConfig = sensorConfig;
     }

     /**
      * Processes a list of race data rows and returns a map containing sensor values organized by sensor name.
      *
      * @param rows The list of RaceDataDTO objects representing race data rows.
      * @return A map containing sensor values organized by sensor name.
      */
     public Map<String, List<Map<String, Object>>> processRows(List<RaceDataDTO> rows) {
          initializeSensorConfig();

          Map<String, List<Map<String, Object>>> output = new HashMap<>();
          setSensorConfig(sensorConfig);

          return getStringListMap(rows, output);
     }

     private void initializeSensorConfig() {
          try {
               InputStream inputStream = getClass().getClassLoader().getResourceAsStream("SensorConfigV2.json");

               if (inputStream != null) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    this.sensorConfig = objectMapper.readValue(inputStream, SensorConfig.class);
               } else {
                    LOGGER.log(Level.SEVERE, () -> "Error: Resource not found (sensorConfigV2.json)");
               }
          } catch (Exception e) {
               LOGGER.log(Level.SEVERE, "Error initializing sensorConfig: " + e.getMessage(), e);
          }
     }

     private Map<String, List<Map<String, Object>>> getStringListMap(List<RaceDataDTO> rows, Map<String, List<Map<String, Object>>> output) {
          for (RaceDataDTO row : rows) {
               String timestamp = row.getTime();
               Map<String, Float> valueBySensorName = processCanDataToSensorValues(row);

               for (Map.Entry<String, Float> entry : valueBySensorName.entrySet()) {
                    String name = entry.getKey();
                    Float value = entry.getValue();
                    output.computeIfAbsent(name, k -> new ArrayList<>()).add(Map.of("x", timestamp, "y", value));
               }
          }
          return output;
     }

     private Map<String, Float> processCanDataToSensorValues(RaceDataDTO row) {
          long rowId = row.getId();
          String canId = String.valueOf(row.getSensorID());
          BigInteger value = row.getValue();
          String timestamp = row.getTime();

          Map<String, Float> valueBySensorName = new HashMap<>();
          if (sensorConfig.getSensors().containsKey(canId)) {
               List<Map<String, Object>> configs = sensorConfig.getSensors().get(canId);
               for (Map<String, Object> config : configs) {
                    float sensorValueFloat = processSensorValue(config, value);

                    if (isSensorValueWithinBounds(config, sensorValueFloat)) {
                         valueBySensorName.put((String) config.get("sensor_name"), sensorValueFloat);
                    } else {
                         logOutOfBoundsSensorValue(config, sensorValueFloat, value, canId, timestamp, rowId);
                    }
               }
          }
          return valueBySensorName;
     }

     private float processSensorValue(Map<String, Object> config, BigInteger value) {
          double bitOffset = ((Number) config.get("byte_offset")).doubleValue() * 8;
          int bitWidth = (int) config.get("byte_width") * 8;
          boolean signed = (boolean) config.get("signed");
          double shiftRightN = 64 - bitWidth - bitOffset;

          BigInteger sensorValue = value.shiftRight((int) shiftRightN).and(BigInteger.valueOf((1L << bitWidth) - 1));

          if (signed) {
               sensorValue = sensorValue.shiftLeft(64 - bitWidth).shiftRight(64 - bitWidth);
          }

          float multiplier = ((Number) config.get("multiplier")).floatValue();
          float offset = ((Number) config.get("offset")).floatValue();

          return sensorValue.floatValue() * multiplier + offset;
     }

     private boolean isSensorValueWithinBounds(Map<String, Object> config, float sensorValueFloat) {
          float minValue = ((Number) config.get("minimum_value")).floatValue();
          float maxValue = ((Number) config.get("maximum_value")).floatValue();
          return sensorValueFloat >= minValue && sensorValueFloat <= maxValue;
     }

     private void logOutOfBoundsSensorValue(Map<String, Object> config, float sensorValueFloat, BigInteger value, String canId, String timestamp, long rowId) {
          LOGGER.log(Level.SEVERE, "Sensor config: {0} produced out of bounds sensor value: {1} from original CAN value: {2} with CAN ID: {3} and timestamp: {4} and row ID: {5}", new Object[]{config, sensorValueFloat, value, canId, timestamp, rowId});
     }

}