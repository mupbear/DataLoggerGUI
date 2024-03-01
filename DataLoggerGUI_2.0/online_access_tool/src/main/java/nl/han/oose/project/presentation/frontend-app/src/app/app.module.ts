  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { FormsModule } from '@angular/forms';
  import { Login } from './login/login.component';
  import { ErrorMessageComponent } from './error-message/error-message.component';
  import {LinechartComponent} from "./linechart/linechart.component";
  import {HistogramComponent} from "./histogram/histogram.component";
  import {ScatterPlotComponent} from "./scatter-plot/scatter-plot.component";
  import {TableComponent} from "./table/table.component";
  import { PlotlyViaCDNModule } from 'angular-plotly.js';
  import { HomeComponent } from './home/home.component';
  import { HttpClientModule} from "@angular/common/http";
  import {CarpickerComponent} from "./carpicker/carpicker.component";
  import {NavbarComponent} from "./navbar/navbar.component";

  PlotlyViaCDNModule.setPlotlyVersion('latest');
  @NgModule({
    declarations: [
      AppComponent,
      ErrorMessageComponent,
      Login,
      LinechartComponent,
      HistogramComponent,
      ErrorMessageComponent,
      ScatterPlotComponent,
      TableComponent,
      HomeComponent,
      NavbarComponent,
      CarpickerComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      PlotlyViaCDNModule,
      HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
