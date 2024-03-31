import { Component, OnInit, OnDestroy} from '@angular/core';
import { ApiService } from '../api-service.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggedInUserService } from '../logged-in-user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


import Customer from '../../../../server/models/Customer';
import Room from '../../../../server/models/Room';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription;
  loginForm: FormGroup;
  apiService: ApiService;
  customers: Customer[] = [];
  availableRoomsFromQuery: Room[] = [];

  constructor(private route: ActivatedRoute, private loggedInUserService: LoggedInUserService, private fb: FormBuilder, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const availableRoomsFromQuery = params['availableRooms'];
      if (availableRoomsFromQuery) {
        this.availableRoomsFromQuery = availableRoomsFromQuery;
      }
    });

    forkJoin({
      customers: this.apiService.getCustomers()
    
    }).subscribe(({ customers }) => {
      this.customers = customers;
    });
  }

  loginCustomer(email: string, password: string) {
    let customer = this.customers.find(customer => customer.email === email);
    if (customer && customer.password === password) {
      alert('Customer logged in');
      this.loggedInUserService.setLoggedInCustomer(customer);
      
      if(this.availableRoomsFromQuery) {
        this.router.navigate(['/search-rooms'], { queryParams: { availableRooms: this.availableRoomsFromQuery } });
      } else {
        this.router.navigate(['/search-rooms']);
      }
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  validateLogin() : void {
    const e = this.loginForm.get('email');
    const pass = this.loginForm.get('password');

    if(e && pass) {
      const email = e.value;
      const password = pass.value;
      if (email === '' || password === '') {
        alert('Please enter an email and password.');
      } else {
        this.loginCustomer(email, password);
      }
    }
  }

  goToCustomerSignup(): void {
    this.router.navigate(['/customer-signup']); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

