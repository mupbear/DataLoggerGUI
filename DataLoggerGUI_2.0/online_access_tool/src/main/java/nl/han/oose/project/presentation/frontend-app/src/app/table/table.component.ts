import {Component} from '@angular/core';

@Component({
  selector: 'table',
  template: '<div class="box black-box box-padding mt-2 mr-2"><plotly-plot [data]="graph.data" [layout]="graph.layout" [useResizeHandler]="true"></plotly-plot></div>',
  styleUrls: ['./table.component.css']
})
export class TableComponent{

  public graph = {
    config:{
      responsive: true,
      displayModeBar: false
    },
    data: [{
      type: 'table',

      columnorder: [0,1,2,3,4,5,6,7,8,9],

      header: {

        values: ['Laptime', 'Fuel consumption'],

        align: ["center", "center"],

        line: {width: 1, color: '##3c3b40'},

        fill: {color: '#28272D'},

        font: {family: "Arial", size: 20, color: "white"}

      },

      cells: {

        values: [
          ['1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3','1', '2', '3',],
          ['3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25','3.2', '4,09', '3.25',]],

        align: ["center", "center"],

        line: {color: "##3c3b40", width: 1},
        fill: {color: '#28272D'},

        font: {family: "Arial", size: 15, color: ["white"]}

      }
    }],
    layout: {
      title:"Auto info",
      font: {
        color: "white"
      },
      height: '100%',
      autosize: true,
      plot_bgcolor: 'black',
      paper_bgcolor: '#343740',
      margin: {t: 25, l: 25, r: 25, b: 25}
    }

  };
}
