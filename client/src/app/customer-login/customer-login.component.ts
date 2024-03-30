import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api-service.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import Customer from '../../../../server/models/Customer';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {

  loginForm: FormGroup;
  apiService: ApiService;
  customers: Customer[] = [];

  constructor(private fb: FormBuilder, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    console.log('Customer Login Component Initialized');
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
      
      // navigate to customer portal
      // this.router.navigate(['/customer-portal']);
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
}

