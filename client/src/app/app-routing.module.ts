import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeePortalComponent } from './employee-portal/employee-portal.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: AppComponent},
  { path: 'home/main', component: HomeComponent},
  { path: 'employee-login', component: EmployeeLoginComponent},
  { path: 'employee-portal', component: EmployeePortalComponent}
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }