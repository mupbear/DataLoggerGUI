package nl.han.oose.project.business.decoding;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * JsonParser is an abstract class responsible for parsing JSON files and providing functionality to read JSON data.
 */
public abstract class JsonParser {
    private static final Logger LOGGER = Logger.getLogger(JsonParser.class.getName());

    /**
     * Parses a JSON file containing sensor configuration and returns a SensorConfig object.
     *
     * @param filePath The path to the JSON file.
     * @return A SensorConfig object parsed from the JSON file.
     */
    public abstract SensorConfig parseSensorConfig(String filePath);

    /**
     * Reads a JSON file and maps its contents to an object of the specified type.
     *
     * @param <T>       The type of the object to be returned.
     * @param filePath  The path to the JSON file.
     * @param valueType The class of the type to be returned.
     * @return An object of the specified type mapped from the JSON file, or null if an exception occurs.
     */
    protected <T> T readFile(String filePath, Class<T> valueType) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File(filePath), valueType);
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, e.getMessage(), e);
            return null;
        }
    }
}
