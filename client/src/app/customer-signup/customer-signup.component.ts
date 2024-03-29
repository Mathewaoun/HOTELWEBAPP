import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-singup',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.css'
})
export class CustomerSignupComponent {
  constructor(private router: Router) {

  }
  ngOnInit() {
    console.log('Customer SignUp Component Initialized');
  }

}

