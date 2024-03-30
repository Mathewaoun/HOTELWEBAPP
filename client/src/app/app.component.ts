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
    this.router.navigate(['/home/main']);
  }

  goHome(): void {
    console.log("Home clicked");
    this.router.navigate(['/home/main']);
  }

  goToEmployeeLogin(): void {
    console.log("Employee login clicked");

    this.router.navigate(['/employee-login']);
  }

  goToCustomerLogin(): void {
    this.router.navigate(['/customer-login']);

  }

  goToCustomerSignup(): void {
    this.router.navigate(['/customer-signup']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }
}
