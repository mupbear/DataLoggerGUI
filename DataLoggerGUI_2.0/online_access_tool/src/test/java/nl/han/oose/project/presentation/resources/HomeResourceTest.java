package nl.han.oose.project.presentation.resources;
import jakarta.ws.rs.core.Response;
import nl.han.oose.project.business.scheduler.RaceDataScheduler;
import nl.han.oose.project.business.services.RaceDataService;
import nl.han.oose.project.presentation.dto.RaceDataResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import static java.net.HttpURLConnection.*;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class HomeResourceTest {

    @Mock
    private RaceDataService raceDataService;

    @Mock
    private RaceDataScheduler raceDataScheduler;

    @InjectMocks
    private HomeResource homeResource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void returnAllCars_shouldReturnOkResponse() {
        // Arrange
        List<String> cars = Arrays.asList("car1", "car2");
        when(raceDataService.getAllCars()).thenReturn(cars);

        // Act
        Response response = homeResource.returnAllCars();

        // Assert
        assertEquals(HTTP_OK, response.getStatus());
        assertEquals(cars, response.getEntity());
    }

    @Test
    void getLiveRaceData_withValidParameters_shouldReturnOkResponse() {
        // Arrange
        when(raceDataService.getLiveRaceData(anyInt(), anyString(), anyString(), anyString()))
                .thenReturn(new RaceDataResponseDTO("Car1", new ArrayList<>()));

        // Act
        Response response = homeResource.getLiveRaceData("Car1", "2023-01-01", "2023-01-02", 1);

        // Assert
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertNotNull(response.getEntity());
        assertTrue(response.getEntity() instanceof RaceDataResponseDTO);
    }


    @Test
    void getLatestRaceData_withValidParameters_shouldReturnOkResponse() {
        // Arrange
        List<String> cars = Arrays.asList("Car1", "Car2", "Car3");
        when(raceDataService.getAllCars()).thenReturn(cars);

        // Act
        Response response = homeResource.returnAllCars();

        // Assert
        assertEquals(HTTP_OK, response.getStatus());
        assertEquals(cars, response.getEntity());
    }
}
