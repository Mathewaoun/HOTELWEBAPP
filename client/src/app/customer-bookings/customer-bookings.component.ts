import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '.././api-service.service';
import { ActivatedRoute } from '@angular/router';
import Customer from '../../../../server/models/Customer';
import Address from '../../../../server/models/Address';
import Room from '../../../../server/models/Room';
import Hotel from '../../../../server/models/Hotel';
import Chain from '../../../../server/models/Chain';
import Booking from '../../../../server/models/Booking';

import { LoggedInUserService } from '../logged-in-user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

export class BookingData {
  id: number;
  chainName: string;
  hotelAddress: string;
  roomNumber: number;
  checkInDate: Date;
  checkOutDate: Date;
  dateBooked: Date;

  constructor(id: number, chainName: string, hotelAddress: string, roomNumber: number, checkInDate: Date, checkOutDate: Date, dateBooked: Date) {
    this.id = id;
    this.chainName = chainName;
    this.hotelAddress = hotelAddress;
    this.roomNumber = roomNumber;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.dateBooked = dateBooked;
  }
}

@Component({
  selector: 'app-customer-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-bookings.component.html',
  styleUrl: './customer-bookings.component.css'
})
export class CustomerBookingsComponent {

  subscription: Subscription = new Subscription;
  apiService: ApiService;
  customerBookings: Booking[] = [];
  bookingData: BookingData[] = [];

  constructor(private loggedInUserService: LoggedInUserService, private route: ActivatedRoute, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.subscription = this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
      if (!customer) {
        console.log('No customer logged in');
        this.router.navigate(['customer-login']);
      }
    });
  }

  ngOnInit() {
    forkJoin({
      bookings: this.apiService.getBookings(),
      hotels: this.apiService.getHotels(),
      rooms: this.apiService.getRooms(),
      chains: this.apiService.getChains(),
      addresses: this.apiService.getAddresses()
    }).subscribe(({ bookings, hotels, rooms, chains, addresses }) => {
      
      for (const b of bookings) {
        this.loggedInUserService.getLoggedInCustomer().subscribe(customer => {
          if (b.customerId === customer.id) {
            this.customerBookings.push(b);
          }
        });
      }

      

      for (const b of this.customerBookings) {
        let room = rooms.find(h => h.id === b.roomId);
        let hotel = hotels.find(h => h.id === room?.hotelId);
        let hotelAddress = addresses.find(a => a.id === hotel?.addressID);
        let chain = chains.find(c => c.id === hotel?.chainID);

        let address = hotelAddress?.street + ', ' + hotelAddress?.apt + ', ' + hotelAddress?.postalCode + ' ' + hotelAddress?.city + ', ' + hotelAddress?.province;
        let roomNumber = room?.id;
        let chainName = chain?.name;
        let checkInDate = b.checkInDate;
        let checkOutDate = b.checkOutDate;
        let dateBooked = b.dateBooked;

        this.bookingData.push(new BookingData(b.id, chainName, address, roomNumber, checkInDate, checkOutDate, dateBooked));
      }
    
    })
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['customer-landing']);
  }
}
