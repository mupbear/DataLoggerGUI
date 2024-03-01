package nl.han.oose.project.business.decoding;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SensorConfig {
    private String carName;
    private String minimumTimestamp;
    private String maximumTimestamp;
    private Map<String, List<Map<String, Object>>> sensors;

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public String getMinimumTimestamp() {
        return minimumTimestamp;
    }

    public void setMinimumTimestamp(String minimumTimestamp) {
        this.minimumTimestamp = minimumTimestamp;
    }

    public String getMaximumTimestamp() {
        return maximumTimestamp;
    }

    public void setMaximumTimestamp(String maximumTimestamp) {
        this.maximumTimestamp = maximumTimestamp;
    }

    public Map<String, List<Map<String, Object>>> getSensors() {
        return sensors;
    }

    public List<Integer> getCanIds() {
        List<Integer> canIds = new ArrayList<>();
        for (String canId : sensors.keySet()) {
            canIds.add(Integer.parseInt(canId));
        }
        return canIds;
    }
    public void setSensors(Map<String, List<Map<String, Object>>> sensors) {
        this.sensors = sensors;
    }
}
