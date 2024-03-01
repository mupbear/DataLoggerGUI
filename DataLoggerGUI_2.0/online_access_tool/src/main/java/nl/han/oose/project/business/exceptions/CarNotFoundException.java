package nl.han.oose.project.business.exceptions;

import static java.net.HttpURLConnection.*;

/**
 * Exception thrown when a requested car is not found.
 */
public class CarNotFoundException extends RuntimeException {

    /**
     * The HTTP status code associated with the exception.
     */
    public static final int STATUS_CODE = HTTP_INTERNAL_ERROR;

    /**
     * Constructs a new CarNotFoundException with the specified detail message.
     *
     * @param message The detail message.
     */
    public CarNotFoundException(String message) {
        super(message);
    }
}
