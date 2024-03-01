package nl.han.oose.project.business.decoding;



public class ConcreteJsonParser extends JsonParser {

    @Override
    public SensorConfig parseSensorConfig(String filePath) {
        return readFile(filePath, SensorConfig.class);
    }
}
