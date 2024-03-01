import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Login} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";

/**
 * In this routing module the links of the different components are configured
 * "extraPagina..." are left for further changes. To get this working you can change the name in the
 * login.component.html and here. To link somewhere you can give the component to where you want the linkt to go
 * Making an angular component is "ng generate component your_component_name" in the terminal.
 */
const routes: Routes = [
  {path: 'login', component: Login},
  {path: '', component: HomeComponent},
  {
    path: ':carName/:startDate/:endDate/:sensorId', component: HomeComponent,
    children: [{path: '', component: NavbarComponent}]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
