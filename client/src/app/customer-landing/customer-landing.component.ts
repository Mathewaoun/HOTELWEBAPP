import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '.././api-service.service';
import { ActivatedRoute } from '@angular/router';
import Customer from '../../../../server/models/Customer';
import Address from '../../../../server/models/Address';

import { LoggedInUserService } from '../logged-in-user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-landing',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-landing.component.html',
  styleUrl: './customer-landing.component.css'
})
export class CustomerLandingComponent implements OnInit {

  subscription: Subscription = new Subscription;
  customer!: Customer;

  constructor(private loggedInUserService: LoggedInUserService, private route: ActivatedRoute, apiService: ApiService, private router: Router) {
    this.subscription = this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
      this.customer = customer;
    });
  }

  ngOnInit() {
    this.subscription = this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
      if (!customer) {
        console.log('No customer logged in');
        this.router.navigate(['customer-login']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createNewBooking() {
  }

  viewBookings() {
    this.router.navigate(['customer-bookings']);
  }

}
