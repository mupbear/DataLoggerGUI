package nl.han.oose.project.business.scheduler;
import jakarta.ejb.Schedule;
import jakarta.ejb.Singleton;
import jakarta.inject.Inject;
import nl.han.oose.project.business.services.RaceDataService;
import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
public class RaceDataScheduler {

    private static final Logger LOGGER = Logger.getLogger(RaceDataScheduler.class.getName());
    @Inject
    private RaceDataService raceDataService;
    private String raceCarName = "defaultCar";
    private String startTime = "defaultStartTime";
    private String endTime = "defaultEndTime";
    private int sensorID = 1;

    private RaceDataResponseDTO latestRaceData;

    /**
     * Scheduled method to retrieve the latest race data periodically.
     * The schedule is defined to run every second.
     */
    @Schedule(second = "*/1", minute = "*", hour = "*", persistent = false)
    public void getLatestRaceDataPeriodically() {
        try {
            if (raceCarName == null || raceCarName.isEmpty()) {
                LOGGER.log(Level.SEVERE, "Race car name is required");
            }
            latestRaceData = raceDataService.getLatestLiveRaceData(sensorID, startTime, endTime, raceCarName);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error fetching live race data: " + e.getMessage(), e);
        }
    }
    public RaceDataResponseDTO getLatestRaceData() {
        return latestRaceData;
    }

    public String getRaceCarName() {
        return raceCarName;
    }

    public void setRaceCarName(String raceCarName) {
        this.raceCarName = raceCarName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getSensorID() {
        return sensorID;
    }

    public void setSensorID(int sensorID) {
        this.sensorID = sensorID;
    }
}