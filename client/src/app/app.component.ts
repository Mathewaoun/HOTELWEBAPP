import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { LoggedInUserService } from './logged-in-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  subscription: Subscription = new Subscription;
  showEmployeeLogin: boolean = false;
  displaySearchBar: boolean = true;
  customerLogin: boolean = false;
  customerSignup: boolean = false;
  

  constructor(private loggedInUserService: LoggedInUserService, private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(['/home/main']);
  }

  goHome(): void {
    console.log("Home clicked");
    this.router.navigate(['/home']);
  }

  goToEmployeeLogin(): void {
    
    if(this.loggedInUserService.isEmployeeLoggedIn()) {
      this.loggedInUserService.getLoggedInEmployee().subscribe(employee => {
        const username = employee.userName;
        const password = employee.password;
        if(username === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/employee-portal'], { queryParams: { username: username, password: password } });
        }
        
      });
    } else if(this.loggedInUserService.isCustomerLoggedIn()) {
      alert('You have been logged out.');
      this.loggedInUserService.logOut();
      this.router.navigate(['/employee-login']);
    } else {
      this.router.navigate(['/employee-login']);
    }
  }

  goToCustomerLogin(): void {

    if(this.loggedInUserService.isCustomerLoggedIn()) {
      this.router.navigate(['/search-rooms']);
    } else if(this.loggedInUserService.isEmployeeLoggedIn()) {
      alert('You have been logged out.');
      this.loggedInUserService.logOut();
      this.router.navigate(['/customer-login']);
    } else {
      this.router.navigate(['/customer-login']);
    }
    
  }

  goToCustomerSignup(): void {
    this.router.navigate(['/customer-signup']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }

  signOut(): void {
    if(this.loggedInUserService.userSignedIn()) {
      this.loggedInUserService.logOut();
      alert('You have been signed out');
      this.router.navigate(['/home/main']);
    } else {
      alert('No user is signed in');
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
