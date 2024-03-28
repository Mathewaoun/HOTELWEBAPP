import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api-service.service';
import Employee from '../../../../server/models/Employee';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})

export class EmployeeLoginComponent implements OnInit{

  searchForm: FormGroup;
  apiService: ApiService;
  employees: Employee[] = [];

  constructor(private fb: FormBuilder, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.searchForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
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
      console.log('Employee logged in');
      //this.router.navigate(['/employee-portal']);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  validateLogin() {
    let username = this.searchForm.get('username')?.value;
    let password = this.searchForm.get('password')?.value;

    if (username === '' || password === '') {
      alert('Please enter a username and password.');
    } else {
      this.loginEmployee(username, password);
    }
  }

}