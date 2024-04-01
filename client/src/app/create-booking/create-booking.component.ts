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
import { RoomData } from '../search-rooms/search-rooms.component';
import Booking from '../../../../server/models/Booking';
import Archive from '../../../../server/models/Archive';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {

  subscription: Subscription = new Subscription;
  roomData: RoomData = new RoomData(0, 0, 0, '', '', '', '', true, true, true);
  totalPrice: number = 0;
  customerName: string = '';
  customer: Customer = new Customer('','','','','','','','','','','','');
  apiService: ApiService;

  constructor(private loggedInUserService: LoggedInUserService, private route: ActivatedRoute, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.subscription = this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
      this.customer = customer;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomData = JSON.parse(params['room']);

    });

    this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
      this.customerName = customer.firstName + ' ' + customer.lastName;
    });

    const checkOutDate = new Date(this.roomData.checkOutDate);
    const checkInDate = new Date(this.roomData.checkInDate);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numNights = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.totalPrice = numNights * this.roomData.price;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirmBooking() {

    //create an instance of date for the current date in the format of yyyy-dd-mm
    let currentDate = new Date();
    let formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  
    let booking = new Booking(-1, this.customer.id, null, this.roomData.id, null, formattedDate, this.customerName, this.roomData.checkInDate, this.roomData.checkOutDate, this.roomData.capacity, false, true);
    let archive = new Archive(-1, this.customer.firstName, this.customer.lastName, this.roomData.id, this.roomData.checkInDate, this.roomData.checkOutDate, formattedDate);
    forkJoin({
      booking: this.apiService.createBooking(booking),
      archive: this.apiService.createArchive(archive)
    }).subscribe(data => {
      console.log('Booking created');
    });
    
    this.router.navigate(['customer-landing']);
  }

  goBack() {
    this.router.navigate(['search-rooms']);
  }
}
