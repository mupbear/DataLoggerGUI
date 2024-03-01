package nl.han.oose.project.presentation.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RaceDataResponseDTO {
    private String carName;
    private List<Map<String, Object>> sensors;

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public List<Map<String, Object>> getSensors() {
        return sensors;
    }

    public void setSensors(List<Map<String, Object>> sensors) {
        this.sensors = sensors;
    }

    public RaceDataResponseDTO(String carName, List<Map<String, Object>> sensors) {
        this.carName = carName;
        this.sensors = sensors;
    }

    public RaceDataResponseDTO(Map<String, Object> decodedData) {
        this.carName = (String) decodedData.get("carName");

        Map<String, List<Map<String, Object>>> sensorsMap = (Map<String, List<Map<String, Object>>>) decodedData.get("sensors");
        this.sensors = extractSensorInfo(sensorsMap);
    }

    private List<Map<String, Object>> extractSensorInfo(Map<String, List<Map<String, Object>>> sensorsMap) {
        List<Map<String, Object>> sensorInfoList = new ArrayList<>();

        for (Map.Entry<String, List<Map<String, Object>>> entry : sensorsMap.entrySet()) {
            List<Map<String, Object>> sensorDetails = entry.getValue();
            sensorInfoList.addAll(sensorDetails);
        }

        return sensorInfoList;
    }
}