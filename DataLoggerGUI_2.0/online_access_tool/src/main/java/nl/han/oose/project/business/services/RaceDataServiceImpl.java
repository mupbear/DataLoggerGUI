package nl.han.oose.project.business.services;
import jakarta.inject.Inject;
import nl.han.oose.project.business.decoding.DecoderV2;
import nl.han.oose.project.business.decoding.SensorConfig;
import nl.han.oose.project.business.exceptions.CarNotFoundException;
import nl.han.oose.project.datasource.DAO.IRaceDataDAO;
import nl.han.oose.project.presentation.dto.RaceDataDTO;
import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Implementation of the {@code RaceDataService} interface providing race data-related functionality.
 */
public class RaceDataServiceImpl implements RaceDataService {

    private IRaceDataDAO raceDataDAO;
    private DecoderV2 decoderV2;
    @Inject
    public void setiRaceDataDAO(IRaceDataDAO raceDataDAO) {
        this.raceDataDAO = raceDataDAO;
    }

    @Inject
    public void setDecoderV2(DecoderV2 decoderV2, SensorConfig config) {
        this.decoderV2 = decoderV2;
        this.decoderV2.setSensorConfig(config);
    }

    /**
     * Retrieves the live race data for a specified race car within a given time range and sensor.
     *
     * @param sensorID    The ID of the sensor associated with the race car.
     * @param startTime   The start time for the live race data retrieval period.
     * @param endTime     The end time for the live race data retrieval period.
     * @param raceCarName The name of the race car for which live race data is requested.
     * @return A {@code RaceDataResponseDTO} containing the live race data in a decoded format.
     */
    @Override
    public RaceDataResponseDTO getLiveRaceData(int sensorID, String startTime, String endTime, String raceCarName) {
        List<RaceDataDTO> carInfo = raceDataDAO.findWhereSensorIsBetweenDate(sensorID, startTime, endTime, raceCarName);
        Map<String, List<Map<String, Object>>> carInfoDecoded = decoderV2.processRows(carInfo);

        String carName = raceCarName;
        List<Map<String, Object>> decodedSensorData = extractSensorData(carInfoDecoded);

        return new RaceDataResponseDTO(carName, decodedSensorData);
    }

    /**
     * Retrieves the latest live race data for a specified race car within a given time range and sensor.
     *
     * @param sensorID    The ID of the sensor associated with the race car.
     * @param startTime   The start time for the live race data retrieval period.
     * @param endTime     The end time for the live race data retrieval period.
     * @param raceCarName The name of the race car for which live race data is requested.
     * @return A {@code RaceDataResponseDTO} containing the latest live race data in a decoded format.
     */
    public RaceDataResponseDTO getLatestLiveRaceData(int sensorID, String startTime, String endTime, String raceCarName) {
        List<RaceDataDTO> carInfo = raceDataDAO.findNewDataForSensor(sensorID, startTime, endTime, raceCarName);
        Map<String, List<Map<String, Object>>> carInfoDecoded = decoderV2.processRows(carInfo);

        String carName = raceCarName;
        List<Map<String, Object>> decodedSensorData = extractSensorData(carInfoDecoded);

        return new RaceDataResponseDTO(carName, decodedSensorData);
    }

    /**
     * Extracts the decoded sensor data from the provided map.
     *
     * @param carInfoDecoded A map containing decoded sensor data for a race car.
     * @return A list of maps representing the decoded sensor data.
     */
    private List<Map<String, Object>> extractSensorData(Map<String, List<Map<String, Object>>> carInfoDecoded) {
        List<Map<String, Object>> decodedSensorData = new ArrayList<>();
        for (Map.Entry<String, List<Map<String, Object>>> entry : carInfoDecoded.entrySet()) {
            if (!"carName".equals(entry.getKey())) {
                String sensorTitle = entry.getKey();
                List<Map<String, Object>> sensorValues = entry.getValue();
                if (sensorValues != null && !sensorValues.isEmpty()) {
                    extractDataPoints(decodedSensorData, sensorTitle, sensorValues);
                }
            }
        }
        return decodedSensorData;
    }

    /**
     * Extracts individual data points from the provided sensor values and adds them to the decoded sensor data list.
     *
     * @param decodedSensorData The list to which decoded sensor data will be added.
     * @param sensorTitle       The title or ID of the sensor.
     * @param sensorValues      The list of sensor values.
     */
    private void extractDataPoints(List<Map<String, Object>> decodedSensorData, String sensorTitle, List<Map<String, Object>> sensorValues) {
        for (Map<String, Object> dataPoint : sensorValues) {
            if (dataPoint != null) {
                Object decodedValue = dataPoint.get("y");

                Map<String, Object> sensorResult = Map.of(
                        "sensorId", sensorTitle,
                        "sensorName", sensorTitle,
                        "time", dataPoint.get("x"),
                        "value", decodedValue
                );
                decodedSensorData.add(sensorResult);
            }
        }
    }

    /**
     * Retrieves information about all available cars.
     *
     * @return A string containing information about all available cars.
     * @throws CarNotFoundException If no cars are found.
     */
    @Override
    public List<String> getAllCars() throws CarNotFoundException {
        return raceDataDAO.findAllCars();
    }
}