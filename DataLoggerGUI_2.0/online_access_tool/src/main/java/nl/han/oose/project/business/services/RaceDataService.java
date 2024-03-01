package nl.han.oose.project.business.services;

import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import java.util.List;

public interface RaceDataService {
    List<String> getAllCars();
    RaceDataResponseDTO getLiveRaceData(int sensorID, String startTime, String endTime, String raceCarName);
    RaceDataResponseDTO getLatestLiveRaceData(int sensorID, String startTime, String endTime, String raceCarName);
}