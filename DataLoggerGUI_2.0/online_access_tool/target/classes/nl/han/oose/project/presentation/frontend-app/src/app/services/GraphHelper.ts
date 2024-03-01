import { GraphColors } from './GraphColors';

export class GraphHelper {
  private graphColors: GraphColors;

  constructor() {
    this.graphColors = new GraphColors();
  }

  /**
   * Processes sensor data to create a formatted array for a trace.
   * @param sensors - The array of sensor data.
   * @param sensorName - The name of the sensor to filter data for.
   * @returns An array with formatted x and y values for the trace.
   */
  public processSensorData(sensors: any[], sensorName: string): any[] {
    return sensors
      .filter((sensor: any) => sensorName === sensor.sensorName)
      .map((sensor: any) => ({
        x: new Date(sensor.time).toISOString(),
        y: sensor.value,
      }));
  }

  /**
   * Creates a trace object for plotting on the graph.
   * @param traceData - The formatted trace data.
   * @param index - The index of the trace.
   * @param sensorName - The name of the sensor associated with the trace.
   * @returns A trace object for the graph.
   */
  public createTrace(traceData: any[], index: number, sensorName: string): any {
    return {
      x: traceData.map((entry: { x: any }) => entry.x),
      y: traceData.map((entry: { y: any }) => entry.y),
      type: 'lines',
      mode: 'lines',
      marker: { color: this.graphColors.getFixedColors(index) },
      yaxis: `y${index + 1}`,
      name: `Trace ${index + 1} - ${sensorName}`,
    };
  }

  /**
   * Creates an annotation object for displaying information on the graph.
   * @param sensorName - The name of the associated sensor.
   * @param minValue - The minimum value in the trace.
   * @param maxValue - The maximum value in the trace.
   * @param curValue - The current displayed value.
   * @param traceColor - The color of the associated trace.
   * @param index - The index of the trace.
   * @returns An annotation object for the graph layout.
   */
  public createAnnotation(sensorName: string, minValue: number, maxValue: number, curValue: number, traceColor: string, index: number): any {
    const xPositionInfo = 0.135;
    const yPositionInfo = 0.1725;
    const xPosition = 0.26;
    const yPosition = xPositionInfo + index * yPositionInfo;

    return {
      x: xPosition,
      y: yPosition,
      xref: 'paper',
      yref: 'paper',
      text: `${sensorName}: Min = ${minValue}, Max = ${maxValue}, Cur = ${curValue}`,
      showarrow: false,
      font: {
        family: 'Courier New, monospace',
        size: 12,
        color: traceColor,
      },
    };
  }

  /**
   * Processes sensor data to create a formatted array for a new trace.
   * @param sensors - The array of sensor data.
   * @param sensorName - The name of the sensor to filter data for.
   * @returns An array with formatted x and y values for the new trace.
   */
  public getTraceData(sensors: any[], sensorName: string): any[] {
    return sensors
      .filter((sensor: any) => sensorName === sensor.sensorName)
      .map((sensor: any) => {
        const dateWithOffset = this.getDateWithOffset(sensor.time);
        return {
          x: dateWithOffset.toISOString(),
          y: sensor.value,
        };
      });
  }

  /**
   * Creates a default trace object with empty data.
   * @param index - The index of the trace.
   * @param sensorName - The name of the sensor associated with the trace.
   * @returns A default trace object for the graph.
   */
  public createDefaultTrace(index: number, sensorName: string): any {
    return {
      x: [],
      y: [],
      type: 'lines',
      mode: 'lines',
      marker: { color: this.graphColors.getFixedColors(index) },
      yaxis: `y${index + 1}`,
      name: `Trace ${index + 1} - ${sensorName}`,
    };
  }

  /**
   * Creates a new trace object for plotting on the graph.
   * @param index - The index of the trace.
   * @param sensorName - The name of the sensor associated with the trace.
   * @param traceData - The formatted trace data.
   * @returns A new trace object for the graph.
   */
  public createNewTrace(index: number, sensorName: string, traceData: any[]): any {
    return {
      x: traceData.map((entry: { x: any }) => entry.x),
      y: traceData.map((entry: { y: any }) => entry.y),
      type: 'lines',
      mode: 'lines',
      marker: { color: this.graphColors.getFixedColors(index) },
      yaxis: `y${index + 1}`,
      name: `Trace ${index + 1} - ${sensorName}`,
    };
  }

  /**
   * Converts a time string to a Date object with timezone offset applied.
   * @param time - The time string to convert.
   * @returns A Date object with timezone offset.
   */
    private getDateWithOffset(time: string): Date {
    const dateWithOffset = new Date(time);
    const offsetInMinutes = dateWithOffset.getTimezoneOffset();
    dateWithOffset.setMinutes(dateWithOffset.getMinutes() - offsetInMinutes);
    return dateWithOffset;
  }
}
