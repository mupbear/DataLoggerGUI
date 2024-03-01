package nl.han.oose.project.datasource.DAO;

import nl.han.oose.project.presentation.dto.RaceDataDTO;
import java.util.List;

public interface IRaceDataDAO {
    List<RaceDataDTO> findAll();
    public List<RaceDataDTO> findNewDataWhereSensorIs(int sensorID, String raceCarName);
    List<RaceDataDTO> findWhereSensorIsOnDate(int sensor, String yearMonthDateHourMinuteSecond, String raceCarNR);
    List<RaceDataDTO> findWhereSensorIsBetweenDate(int sensor, String startYearMonthDateTime, String endYearMonthDateTime, String raceCarName);
    List<RaceDataDTO> findNewDataForSensor(int sensor, String startYearMonthDateTime, String endYearMonthDateTime, String raceCarName);
    List<String> findAllCars();
}

