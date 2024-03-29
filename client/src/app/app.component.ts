import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from './api-service.service';
import Customer from '../../../server/models/Customer';
import Archive from '../../../server/models/Archive';
import Address from '../../../server/models/Address';
import Booking from '../../../server/models/Booking';
import Room from '../../../server/models/Room';
import Hotel from '../../../server/models/Hotel';
import Chain from '../../../server/models/Chain';
import Employee from '../../../server/models/Employee';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showEmployeeLogin: boolean = false;
  displaySearchBar: boolean = true;
  customerLogin: boolean = false;
  customerSignup: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigateByUrl('/home/main');
  }

  goHome(): void {
    console.log("Home clicked");
    this.showEmployeeLogin = false;
    this.displaySearchBar = true;
    this.customerLogin=false;
    this.customerSignup=false;
    this.router.navigateByUrl('/home/main');
  }

  goToEmployeeLogin(): void {
    console.log("Employee login clicked");
    this.showEmployeeLogin = true;
    this.displaySearchBar = false;
    this.customerLogin=false;
    this.customerSignup=false;
    this.router.navigateByUrl('/employee-login');
  }
  goToCustomerLogin(): void {
    this.customerLogin=true;
    this.customerSignup=false;
    this.router.navigateByUrl('/customer-login');

  }
  goToCustomerSignup(): void {
    this.customerSignup=true;
    this.router.navigateByUrl('/customer-signup');

  }
}
