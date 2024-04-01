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
import { RoomData } from '../search-rooms/search-rooms.component';

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
  roomData: RoomData[] = [];
  employeeID: number = 0;

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

    this.route.queryParams.subscribe(params => {
      this.roomData = JSON.parse(params['room']);
      this.employeeID = JSON.parse(params['id']);
    });

    
    forkJoin({
      customers: this.apiService.getCustomers()
    
    }).subscribe(({ customers }) => {
      this.customers = customers;
    });
  }

  loginCustomer(email: string, password: string) {
    let customer = this.customers.find(customer => customer.email === email);
    if ((this.employeeID === 0) && customer && customer.password === password) {
      alert('Customer logged in');
      this.loggedInUserService.setLoggedInCustomer(customer);
      
      if(this.availableRoomsFromQuery.length > 0) {
        this.router.navigate(['/search-rooms'], { queryParams: { availableRooms: this.availableRoomsFromQuery } });
      } else {
        this.router.navigate(['/customer-landing']);
      }
    } else if((this.employeeID !== 0) && customer && customer.password === password) {
      this.router.navigate(['/create-booking'], { queryParams: { room: JSON.stringify(this.roomData), id: JSON.stringify(this.employeeID), name : JSON.stringify(customer.firstName + ' ' + customer.lastName) } });
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
    this.router.navigate(['/customer-signup'], {queryParams: { room: JSON.stringify(this.roomData), id: JSON.stringify(this.employeeID) }}); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

