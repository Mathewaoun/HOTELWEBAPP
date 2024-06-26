import { Component, OnInit, OnDestroy} from '@angular/core';
import { ApiService } from '../api-service.service';
import Employee from '../../../../server/models/Employee';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoggedInUserService } from '../logged-in-user.service';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})

export class EmployeeLoginComponent implements OnInit, OnDestroy{

  subscription: Subscription = new Subscription;
  loginForm: FormGroup;
  apiService: ApiService;
  employees: Employee[] = [];

  constructor(private loggedInUserService: LoggedInUserService, private fb: FormBuilder, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
    if(this.loggedInUserService.isEmployeeLoggedIn()) {
      this.subscription = this.loggedInUserService.getLoggedInEmployee().subscribe(employee => {
        if(employee.userName === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/employee-portal']);
        }
      });
    }
    console.log('Employee Login Component Initialized');
    forkJoin({
      employees: this.apiService.getEmployees()
    
    }).subscribe(({ employees }) => {
      this.employees = employees;
    });
  }


  loginEmployee(username: string, password: string) {
    let employee = this.employees.find(employee => employee.userName === username);
    if (employee && employee.password === password) {
      this.loggedInUserService.setLoggedInEmployee(employee);
      if(employee.userName === 'admin') {
        console.log('Admin logged in');
        this.router.navigate(['/admin']);
      } else {
        console.log('Employee logged in');
        this.router.navigate(['/employee-portal'], { queryParams: { username, password } });
      }
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  validateLogin() : void {
    const user = this.loginForm.get('username');
    const pass = this.loginForm.get('password');

    if(user && pass) {
      const username = user.value;
      const password = pass.value;
      if (username === '' || password === '') {
        alert('Please enter a username and password.');
      } else {
        this.loginEmployee(username, password);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
