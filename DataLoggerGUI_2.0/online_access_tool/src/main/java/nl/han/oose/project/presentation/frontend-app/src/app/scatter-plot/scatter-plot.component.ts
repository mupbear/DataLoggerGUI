import {Component} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'scatter-plot',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout" ></plotly-plot>',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent {

  /**
   * Hardcoded data to get an idea of the graph
   */
  xArrays: number[] = [1, 2, 3, 6, 7, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
    22, 24, 26, 28, 30, 32, 34, 36,
    38, 40, 42, 44, 46, 48, 50, 0,
    5, 15, 25, 35, 45, 50];

  /**
   * Hardcoded data to get an idea of the graph
   */
  yArrays: number[] = [5, 15, 25, 35, 45, 50, 38, 40, 42, 44, 46, 48, 50, 0, 22, 24, 26, 28, 30, 32, 34, 36, 1, 2, 3, 6, 7, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  public graph = {
    data: [
      {x: this.xArrays, y: this.yArrays, type: 'scatter', mode: 'markers', marker: {color: '#81c8bd'}},
    ],
    layout: {
      margin: {
        t: 0,
        b: 20,
        l: 0,
        r: 0
      },
      plot_bgcolor: '#28272D',
      paper_bgcolor: '#343740',
      xaxis: {
        color: "white",
        type: 'linear'
        /**
         * Linear x-axis
         */
      },
      yaxis: {
        color:"white",
        type: 'linear'
        /**
         * Linear y-axis
         */
      },

    },
  };
  /**
   * Subscription variable for fetching data at intervals
   */
  private dataSubscription: Subscription | undefined;

  /**
   * This method is executed when this component is initialised
   */
  ngOnInit() {
    /**
     * Start fetching data at a specific interval (e.g., every second)
     */
    this.dataSubscription = interval(100).subscribe(() => {
      this.fetchDataAndUpdateGraph();
    });
  }

  /**
   * This method is executed when the component gets destroyed
   */
  ngOnDestroy() {
    /**
     * Unsubscribe from the interval when the component is destroyed
     */
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  fetchDataAndUpdateGraph() {
    /**
     * Replace this logic with  database fetching logic
     */
    const newXValue = Math.floor(Math.random() * 50);
    const newYValue = Math.floor(Math.random() * 50);

    /**
     * Update the x and y values of the existing plot without recreating the whole object
     */
    this.xArrays = [...this.xArrays, newXValue];
    this.yArrays = [...this.yArrays, newYValue];

    /**
     * Update the graph data with the new x and y values
     */
    this.graph.data[0].x = this.xArrays;
    this.graph.data[0].y = this.yArrays;
  }

}
