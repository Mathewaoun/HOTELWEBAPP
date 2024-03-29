import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Customer Login Component Initialized');
  }

  goToCustomerSignup(): void {
    this.router.navigate(['/customer-signup']); 
  }
}

