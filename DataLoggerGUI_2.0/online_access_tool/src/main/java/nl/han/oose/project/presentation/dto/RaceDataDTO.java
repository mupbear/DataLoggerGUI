package nl.han.oose.project.presentation.dto;

import java.math.BigInteger;

public class RaceDataDTO {
     private int id;
    private int sensorID;
    private String time;
    private String raceCar;
    private String valueString;
    private BigInteger value;

     public RaceDataDTO(int rowId, int sensorID, String time, String raceCar, String valueString) {
        this.id = rowId;
          this.sensorID = sensorID;
          this.time = time;
          this.raceCar = raceCar;
          this.valueString = valueString;
          this.value = new BigInteger(valueString);
    }

     public RaceDataDTO(String raceCar) {
          this.raceCar = raceCar;
     }

     public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

     public int getSensorID() {
          return sensorID;
     }

     public void setSensorID(int sensorID) {
          this.sensorID = sensorID;
     }

     public String getTime() {
          return time;
     }

     public void setTime(String time) {
          this.time = time;
     }

     public String getRaceCar() {
          return raceCar;
     }

     public void setRaceCar(String raceCar) {
          this.raceCar = raceCar;
     }

     public String getValueString() {
          return valueString;
     }

    public void setValueString(String valueString) {
        this.valueString = valueString;
        this.value = new BigInteger(valueString);
    }

     public BigInteger getValue() {
          return value;
     }

    public void setValue(BigInteger value) {
        this.value = value;
        this.valueString = value.toString();
    }

    @Override
    public String toString() {
        return "RaceDataDTO{" +
                "sensorID=" + sensorID +
                ", time='" + time + '\'' +
                ", raceCar='" + raceCar + '\'' +
                ", valueString='" + valueString + '\'' +
                ", value=" + value +
                '}';
    }
}
