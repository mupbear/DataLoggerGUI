import {Component} from '@angular/core';
@Component({
  selector: 'histogram',
  template: '<div class="box black-box mt-2 mr-2"><plotly-plot [data]="graph.data" [layout]="graph.layout" [useResizeHandler]="true" ></plotly-plot></div>',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent {
  name: string = 'fuel';
  name2: string = 'data2';
  maxValue: number = 50;
  currentValue: number = 33;
  currentValue2 = 50;
  barWidth: number = 0.2;

  graph = {
    data: [
      {
        x: [this.name],
        y: [this.currentValue], // The current y-axis value

        type: 'bar',
        name: this.name,
        marker: {
          color: '#81c8bd',
          line: {
            color: '#81c8bd',
            width: 3
          }
        },
        base: 0
      },
      {
        x: [this.name2],
        y: [this.currentValue2], // The current y-axis value

        type: 'bar',
        name: this.name,
        marker: {
          color: '#f00',
          line: {
            color: '#f00',
            width: 3
          }
        },
        base: 0
      },
    ],
    layout: {
      title:"Test histogram",
      font: {
        color:"white"
      },
      margin: {
        t: 25,
        b: 20,
        l: 20,
        r: 0
      },

      autosize: true,
      plot_bgcolor: '#28272D',
      paper_bgcolor: '#343740',
      height: 120,
      barmode: 'overlay',
        legend: {
          font: {color: "white"}
      },
      xaxis: {
        color:"white",
      },
      yaxis: {
        color: "white",
        type: 'linear',
      },
    }
  };
}


