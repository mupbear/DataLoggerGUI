package nl.han.oose.project.business.services;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.*;
import nl.han.oose.project.business.decoding.DecoderV2;
import nl.han.oose.project.business.exceptions.CarNotFoundException;
import nl.han.oose.project.datasource.DAO.IRaceDataDAO;
import nl.han.oose.project.presentation.dto.RaceDataDTO;
import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class RaceDataServiceImplTest {

     @Mock
     private IRaceDataDAO raceDataDAOMock;

     @Mock
     private DecoderV2 decoderV2Mock;

     @InjectMocks
     private RaceDataServiceImpl raceDataService;

     @BeforeEach
     void setUp() {
          MockitoAnnotations.openMocks(this);
     }

     @Test
     void testGetLiveRaceData() {
          // Arrange
          int sensorID = 1;
          String startTime = "2023-01-01";
          String endTime = "2023-01-31";
          String raceCarName = "Car1";
          List<RaceDataDTO> mockRaceData = Arrays.asList();
          Map<String, List<Map<String, Object>>> mockDecodedData = createMockDecodedData();

          when(raceDataDAOMock.findWhereSensorIsBetweenDate(sensorID, startTime, endTime, raceCarName))
               .thenReturn(mockRaceData);
          when(decoderV2Mock.processRows(mockRaceData)).thenReturn(mockDecodedData);

          // Act
          RaceDataResponseDTO result = raceDataService.getLiveRaceData(sensorID, startTime, endTime, raceCarName);

          // Assert
          assertNotNull(result);
     }

     private Map<String, List<Map<String, Object>>> createMockDecodedData() {
          Map<String, List<Map<String, Object>>> mockDecodedData = new HashMap<>();

          // Voorbeeldgegevens voor een sensor met één datapunt
          List<Map<String, Object>> dataList1 = new ArrayList<>();
          Map<String, Object> data1 = new HashMap<>();
          data1.put("x", "2023-01-01T10:00:00");
          data1.put("y", 25.5); // Voorbeeldwaarde van het gedecodeerde gegeven
          dataList1.add(data1);
          mockDecodedData.put("sensor1", dataList1);

          // Voorbeeldgegevens voor een andere sensor met meerdere datapunten
          List<Map<String, Object>> dataList2 = new ArrayList<>();
          Map<String, Object> data2a = new HashMap<>();
          data2a.put("x", "2023-01-01T10:00:00");
          data2a.put("y", 30.0); // Voorbeeldwaarde van het gedecodeerde gegeven
          dataList2.add(data2a);

          Map<String, Object> data2b = new HashMap<>();
          data2b.put("x", "2023-01-01T10:15:00");
          data2b.put("y", 28.8); // Voorbeeldwaarde van het gedecodeerde gegeven
          dataList2.add(data2b);

          mockDecodedData.put("sensor2", dataList2);

          return mockDecodedData;
     }


     @Test
     void testGetLatestLiveRaceData() {
          // Arrange
          int sensorID = 1;
          String startTime = "2023-01-01";
          String endTime = "2023-01-31";
          String raceCarName = "Car1";
          List<RaceDataDTO> mockRaceData = Arrays.asList();
          Map<String, List<Map<String, Object>>> mockDecodedData = createMockDecodedData();

          when(raceDataDAOMock.findNewDataForSensor(sensorID, startTime, endTime, raceCarName))
               .thenReturn(mockRaceData);
          when(decoderV2Mock.processRows(mockRaceData)).thenReturn(mockDecodedData);

          // Act
          RaceDataResponseDTO result = raceDataService.getLatestLiveRaceData(sensorID, startTime, endTime, raceCarName);

          // Assert
          assertNotNull(result);
          assertEquals(raceCarName, result.getCarName());
          assertNotNull(result.getSensors());
     }


     @Test
     void testGetAllCars() throws CarNotFoundException {
          // Arrange
          List<String> mockCars = Arrays.asList("Car1", "Car2");

          when(raceDataDAOMock.findAllCars()).thenReturn(mockCars);

          // Act
          List<String> result = raceDataService.getAllCars();

          // Assert
          assertNotNull(result);
          assertEquals(2, result.size());
          assertTrue(result.contains("Car1"));
          assertTrue(result.contains("Car2"));
     }

     @Test
     void testGetAllCarsThrowsCarNotFoundException() {
          // Arrange
          when(raceDataDAOMock.findAllCars()).thenThrow(new CarNotFoundException("No car found"));

          // Act & Assert
          assertThrows(CarNotFoundException.class, () -> raceDataService.getAllCars());
     }
}
