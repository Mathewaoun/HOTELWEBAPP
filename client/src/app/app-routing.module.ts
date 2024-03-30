import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { EmployeePortalComponent } from './employee-portal/employee-portal.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: AppComponent},
  { path: 'home/main', component: HomeComponent},
  { path: 'employee-login', component: EmployeeLoginComponent},
  { path: 'customer-login', component: CustomerLoginComponent},
  { path: 'customer-signup', component: CustomerSignupComponent},
  { path: 'employee-portal', component: EmployeePortalComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'confirmation', component: ConfirmationComponent},
  { path: 'search-rooms', component: SearchRoomsComponent}

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }