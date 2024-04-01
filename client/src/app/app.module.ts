import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { EmployeePortalComponent } from './employee-portal/employee-portal.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';
import { CustomerBookingsComponent } from './customer-bookings/customer-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeeLoginComponent,
    EmployeePortalComponent,
    ConfirmationComponent,
    ContactComponent,
    CustomerLoginComponent,
    CustomerSignupComponent,
    HomeComponent,
    PaymentComponent,
    SearchRoomsComponent,
    CustomerLandingComponent,
    CustomerBookingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
