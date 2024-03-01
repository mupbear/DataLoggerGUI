import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  interval,
  Subject,
  Subscription,
  switchMap,
  take,
  takeWhile,
} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from '@angular/router';
import {DataRetrievalContext} from '../services/DataRetrievalContext';
import {EndpointDataStrategy} from '../services/EndpointDataStrategy';
import LocalDataStrategy from "../services/LocalDataStrategy";
import {LiveDataRetrievalStrategy} from "../services/LiveDataRetrievalStrategy";
import {RoutingService} from "../services/routing.service";
import { GraphHelper } from "../services/GraphHelper";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LinechartComponent implements OnInit, OnDestroy {

  private minValueTrace: number[] = [0, 0, 0, 0, 0, 0];
  private maxValueTrace: number[] = [0, 0, 0, 0, 0, 0];
  private curValueTrace: number[] = [0, 0, 0, 0, 0, 0];
  private carNameParam: string = '';
  protected startDateParam: string = '';
  protected endDateParam: string = '';
  private sensorIdParam: string = ''
  private refreshIntervalMilli: number = 3000;
  private endpointLiveData: string = `http://localhost:8080/online_access_tool/live-race-data?raceCarName=${this.carNameParam}&startTime=${this.startDateParam}&endTime=${this.endDateParam}&sensorID=${this.sensorIdParam}`;
  private endpointHistoryData: string = `http://localhost:8080/online_access_tool/race-data?raceCarName=${this.carNameParam}&startTime=${this.startDateParam}&endTime=${this.endDateParam}&sensorID=${this.sensorIdParam}`;

  protected graph = {
    data: [
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'red'}, yaxis: 'y1', name: 'Trace 1'},
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'blue'}, yaxis: 'y2', name: 'Trace 2'},
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'orange'}, yaxis: 'y3', name: 'Trace 3'},
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'green'}, yaxis: 'y4', name: 'Trace 4'},
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'green'}, yaxis: 'y5', name: 'Trace 5'},
      {x: [], y: [], type: 'lines', mode: 'lines', marker: {color: 'green'}, yaxis: 'y6', name: 'Trace 6'},
    ],
    layout: {
      title: 'Car info',
      hovermode: 'x unified',
      annotations: [
        {
          x: 0.1,
          y: 0.80,
          xref: 'paper',
          yref: 'paper',
          text: '',
          showarrow: false,
          font: {
            family: 'Courier New, monospace',
            size: 12,
            color: '#ffffff',
          },
        },
      ],
      font: {
        color: 'white',
      },
      height: 750,
      width: 1600,
      margin: {
        t: 30,
        b: 20,
        l: 40,
        r: 20,
      },
      plot_bgcolor: '#28272D',
      paper_bgcolor: '#343740',
      xaxis: {
        domain: [0.25, 1],
        color: 'white',
        type: 'date',
        rangeselector: {
          buttons: [
            {
              step: 'hour',
              stepmode: 'backward',
              count: 1,
              label: '1h',
            },
            {
              step: 'minute',
              stepmode: 'backward',
              count: 30,
              label: '30m',
            },
            {
              step: 'minute',
              stepmode: 'backward',
              count: 15,
              label: '15m',
            },
            {
              step: 'minute',
              stepmode: 'backward',
              count: 5,
              label: '5m',
            },
            {
              step: 'minute',
              stepmode: 'backward',
              count: 2,
              label: '2m',
            },
            {
              step: 'minute',
              stepmode: 'backward',
              count: 1,
              label: '1m',
            },
            {
              step: 'second',
              stepmode: 'backward',
              count: 30,
              label: '30s',
            },

          ],
          bgcolor: '#81c8bd',
        },
        range: [this.startDateParam, this.endDateParam],
      },
      legend: {
        domain: [0, 0.25],
        font: {color: 'white'},
        x: 0,
        y: 1,
      },
      yaxis: {
        domain: [0, 0.1667],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150],
      },
      yaxis2: {
        domain: [0.18, 0.3333],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150]
      },
      yaxis3: {
        domain: [0.35, 0.5],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150]
      },
      yaxis4: {
        domain: [0.52, 0.6667],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150]
      },
      yaxis5: {
        domain: [0.68, 0.8333],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150]
      },
      yaxis6: {
        domain: [0.85, 1],
        color: 'white',
        title: '',
        linecolor: 'white',
        tickfont: {color: 'white'},
        range: [0, 150]
      },
    },
  };

  private dataSubscription: Subscription | undefined;
  private dataRetrievalContext: DataRetrievalContext;
  private graphHelper : GraphHelper;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {
    this.dataRetrievalContext = new DataRetrievalContext(new EndpointDataStrategy(http, route));
    this.graphHelper = new GraphHelper()
  }

  /**
   * Object containing sensor ID to sensor name mappings.
   * Keys represent sensor IDs, and values are arrays of sensor names.
   */
  private sensorIdToNameMapping: { [key: string]: string[] } = {
    "1536": ["RPM", "TPS", "IAT", "MAP", "INJPW"],
    "1537": ["AIN3"],
    "1538": ["BARO", "OILT", "OILP"],
    "1539": ["IGNANG", "DWELL", "LAMBDA", "LAMCORR", "EGT1", "EGT2"],
    "1540": ["GEAR", "ECUTEMP", "BATT"],
    "1541": ["DBW POS", "DBW TRGT", "TC DRPM RAW", "TC DRPM", "TC TORQUE REDUCTION", "PIT LIMIT TORQUE REDUCTION"],
    "1542": ["AIN #5", "AIN #6"],
    "1543": ["Boost target", "PWM#1 DC"]
  };

  /**
   * Updates URL parameters and navigates to the specified route.
   */
  protected updateUrlParams() {
    const startDate = new Date(this.startDateParam);
    const endDate = new Date(this.endDateParam);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const formattedStartTime = this.formatDateForUrl(startDate);
      const formattedEndTime = this.formatDateForUrl(endDate);

      this.routingService.navigate(this.carNameParam, formattedStartTime, formattedEndTime, this.sensorIdParam)
    } else {
      console.error('Invalid date format');
    }
  }

  /**
   * Formats a date for URL parameter use.
   * @param date - The date to be formatted.
   * @returns A formatted string for URL parameters.
   */
  private formatDateForUrl(date: Date): string {
    const formattedDate = date.toISOString().split('.')[0];
    return formattedDate.replace('T', '%20');
  }

  /**
   * Executes when the component is initialized.
   * - Retrieves and assigns values from route parameters.
   * - Handles navigation or initializes data retrieval based on parameters.
   * - Sets up data subscription for live updates if `sensorId` is provided.
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.carNameParam = params['carName'];
      this.startDateParam = params['startDate'];
      this.endDateParam = params['endDate'];
      this.sensorIdParam = params['sensorId'];
      this.refreshData();

      /** Navigate to default URL if necessary parameters are missing */
      if(!this.carNameParam && !this.startDateParam && !this.endDateParam){
        this.routingService.navigateToDefaultUrl();
      }
      /** Subscribe to live data updates if `sensorId` is provided */
      if (this.sensorIdParam) {
        this.dataSubscription = interval(this.refreshIntervalMilli)
          .pipe(
            switchMap(() => this.getDataObservable()),
            takeWhile(() => !this.stopLiveDataSubject.closed)
          ).subscribe((data) => {
            this.updateGraphData(data);
          });
        /** If no sensorId selected that means we don't want to see any data, so clear the graph */
      } else {
        this.graph.data = [];
        this.refreshData();
      }
    });
  }

  ngOnDestroy() {
    this.stopLiveDataSubject.next();
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  protected stopLiveData() {
    this.dataRetrievalContext.stopDataFetch()
  }

  protected switchToEndpointStrategy() {
    this.dataRetrievalContext.setStrategy(new EndpointDataStrategy(this.http, this.route));
    this.graph.data = [];
    this.refreshData();
  }

  protected switchToLiveDataStrategy() {
    this.dataRetrievalContext.setStrategy(new LiveDataRetrievalStrategy(this.http, this.route));
    this.graph.data = [];
    this.refreshData();
  }

  protected switchToLocalStrategy() {
    this.dataRetrievalContext.setStrategy(new LocalDataStrategy(this.route));
    this.graph.data = [];
    this.refreshData();
  }

  protected refreshData() {
    this.endpointLiveData = `http://localhost:8080/online_access_tool/live-race-data?raceCarName=${this.carNameParam}&startTime=${this.startDateParam}&endTime=${this.endDateParam}&sensorID=${this.sensorIdParam}`;
    this.endpointHistoryData = `http://localhost:8080/online_access_tool/race-data?raceCarName=${this.carNameParam}&startTime=${this.startDateParam}&endTime=${this.endDateParam}&sensorID=${this.sensorIdParam}`;

    this.dataSubscription = this.dataRetrievalContext.getDataObservable().pipe(take(1)).subscribe((data: any) => {
      this.updateGraphData(data);
    });
  }

  /**
   * Updates the graph data based on the retrieved sensor data.
   * @param data - The retrieved sensor data.
   */
  private updateGraphData(data: any): void {
    this.graph.data = [];
    this.graph.layout.annotations = [];

    if (data.sensors && data.sensors.length > 0) {
      if (!this.sensorIdParam) {
        console.error('Sensor ID not found in the URL parameters.');
        return;
      }

      const sensorNames = this.sensorIdToNameMapping[this.sensorIdParam] || [];

      for (let index = 0; index < sensorNames.length; index++) {
        const sensorName = sensorNames[index];
        const traceData = this.graphHelper.processSensorData(data.sensors, sensorName);

        if (!traceData || traceData.length === 0) {
          console.error(`No data available for sensor ${sensorName}`);
          continue;
        }

        const newTrace = this.graphHelper.createTrace(traceData, index, sensorName);
        this.graph.data.push(newTrace);

        const traceYValues = newTrace.y;
        const displayedValues = traceYValues.slice(0, 1);
        const maxValue = Math.max(...traceYValues);
        const minValue = Math.min(...traceYValues);
        const curValue = displayedValues[0];

        const traceColor = newTrace.marker.color;
        const annotation = this.graphHelper.createAnnotation(sensorName, minValue, maxValue, curValue, traceColor, index);

        this.graph.layout.annotations.push(annotation);

        this.minValueTrace[index] = minValue;
        this.maxValueTrace[index] = maxValue;
        this.curValueTrace[index] = curValue;
        console.log('Final Graph Data:', this.graph.data);
      }
    }
  }

  /**
   * Retrieves data from the specified endpoint based on the current data retrieval strategy.
   * @returns An observable for the retrieved data.
   */
  private getDataObservable() {
    let endpoint: string;

    if (this.dataRetrievalContext.getStrategy() instanceof LiveDataRetrievalStrategy) {
      endpoint = this.endpointLiveData;
    } else {
      endpoint = this.endpointHistoryData;
    }
    return this.http.get(endpoint);
  }

  private stopLiveDataSubject = new Subject<void>();
}
