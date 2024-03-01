package nl.han.oose.project.presentation.resources;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import nl.han.oose.project.business.scheduler.RaceDataScheduler;
import nl.han.oose.project.business.services.RaceDataService;
import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/")
public class HomeResource {
    private static final Logger LOGGER = Logger.getLogger(HomeResource.class.getName());
    private RaceDataService raceDataService;
    private RaceDataScheduler raceDataScheduler;

    @Inject
    private void setRaceDataService(RaceDataService raceDataService) {
        this.raceDataService = raceDataService;
    }

    @Inject
    private void setRaceDataService(RaceDataScheduler raceDataScheduler) {
        this.raceDataScheduler = raceDataScheduler;
    }

    /**
     * API-Resource gets different car's out of the database to select which car you want the info from.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response returnAllCars() {
        List<String> cars = raceDataService.getAllCars();
        return Response
             .ok()
             .entity(cars)
             .build();
    }

    /**
     * Retrieves the live race data for a specified race car within a given time range and sensor.
     * <p>
     * This JAX-RS endpoint allows clients to request the live race data for a specific race car, providing
     * parameters such as race car name, start time, end time, and sensor ID.
     *
     * @param raceCarName The name of the race car for which live race data is requested.
     * @param startTime   The start time for the live race data retrieval period.
     * @param endTime     The end time for the live race data retrieval period.
     * @param sensorID    The ID of the sensor associated with the race car.
     * @return A JAX-RS {@code Response} object containing the live race data in JSON format.
     * If successful, the status is set to {@code 200 OK}.
     * If the request is invalid or missing required parameters, the status is set to {@code 400 Bad Request}.
     * If an error occurs during data retrieval, the status is set to {@code 500 Internal Server Error}.
     */
    @Path("/race-data")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLiveRaceData(@QueryParam("raceCarName") String raceCarName,
                                    @QueryParam("startTime") String startTime,
                                    @QueryParam("endTime") String endTime,
                                    @QueryParam("sensorID") int sensorID) {
        try {
            if (raceCarName == null || raceCarName.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Race car name is required").build();
            }

            RaceDataResponseDTO liveRaceData = raceDataService.getLiveRaceData(sensorID, startTime, endTime, raceCarName);
            return Response.status(Response.Status.OK).entity(liveRaceData).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "error: " + e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error fetching live race data").build();
        }
    }

    /**
     * Retrieves the latest live race data for a specified race car.
     * <p>
     * This endpoint allows clients to request the latest live race data for a specific race car,
     * providing parameters such as race car name, start time, end time, and sensor ID.
     *
     * @param raceCarName The name of the race car for which live race data is requested.
     * @param startTime   The start time for the live race data retrieval period.
     * @param endTime     The end time for the live race data retrieval period.
     * @param sensorID    The ID of the sensor associated with the race car.
     * @return A {@code Response} object containing the live race data in JSON format.
     * If successful, the status is set to {@code 200 OK}.
     * If the request is invalid or missing required parameters, the status is set to {@code 400 Bad Request}.
     * If an error occurs during data retrieval, the status is set to {@code 500 Internal Server Error}.
     */

    @Path("/live-race-data")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLatestRaceData(@QueryParam("raceCarName") String raceCarName,
                                      @QueryParam("startTime") String startTime,
                                      @QueryParam("endTime") String endTime,
                                      @QueryParam("sensorID") int sensorID) {
        try {
            if (raceCarName == null || raceCarName.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Race car name is required").build();
            }

            raceDataScheduler.setRaceCarName(raceCarName);
            raceDataScheduler.setStartTime(startTime);
            raceDataScheduler.setEndTime(endTime);
            raceDataScheduler.setSensorID(sensorID);

            RaceDataResponseDTO liveRaceData = raceDataService.getLatestLiveRaceData(sensorID, startTime, endTime, raceCarName);
            return Response.status(Response.Status.OK).entity(liveRaceData).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error: " + e.getMessage(), e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error fetching live race data").build();
        }
    }
}