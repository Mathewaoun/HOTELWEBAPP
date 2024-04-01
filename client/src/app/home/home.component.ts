import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '.././api-service.service';

import Address from '../../../../server/models/Address';
import Booking from '../../../../server/models/Booking';
import Room from '../../../../server/models/Room';
import Hotel from '../../../../server/models/Hotel';
import Chain from '../../../../server/models/Chain';

import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  chains: Chain[] = [];
  hotels: Hotel[] = [];
  rooms: Room[] = [];
  addresses: Address[] = [];
  hotelLocations: Address[] = [];
  bookings: Booking[] = [];
  
  searchForm: FormGroup;
  apiService: ApiService;

  constructor(private fb: FormBuilder,apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.searchForm = this.fb.group({
      location: [''],
      checkInDate: [''],
      checkOutDate: [''],
      roomCapacity: [''],
      hotelChain: [''],
      ratingControl: ['']
    });
  }

  ngOnInit() {
    // getting all chains, hotels, addresses, rooms, and bookings and ensuring all asynchronous functions are completed before proceeding
    forkJoin({
      chains: this.apiService.getChains(),
      hotels: this.apiService.getHotels(),
      addresses: this.apiService.getAddresses(),
      rooms: this.apiService.getRooms(),
      bookings : this.apiService.getBookings()

    }).subscribe(({ chains, hotels, addresses, rooms, bookings }) => {
      this.chains = chains;
      this.hotels = hotels;
      this.addresses = addresses;
      this.rooms = rooms;
      this.bookings = bookings;
  
      //create an instance of date for the current date in the format of yyyy-dd-mm
      let currentDate = new Date();
      let formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  
      for(const b of this.bookings) {
        if(b.checkOutDate < formattedDate) {
          this.apiService.deleteBooking(b.id);
        }
      }

      // getting all unique cities that hotels exist within
      this.getHotelLocations();
    });
  }

  getHotelByRating(rating: number): Hotel[] { 
    return this.hotels.filter(hotel => hotel.rating >= rating);
  }

  getHotelLocations(): void {
    
    for (let hotel of this.hotels) {

      let address: Address;
      this.apiService.getAddressByID(hotel.addressID).subscribe((data: Address) => {
        address = data;
        if (!this.hotelLocations.some(location => location.city === address.city)) {
          this.hotelLocations.push(address);
        }
      });
      
    }
  }

  convertStringToDate(dateString: string): Date {
    
    const [year, month, day] = dateString.split('-').map(Number);

    // Note: JavaScript months are zero-based, so we subtract 1 from the month component
    return new Date(year, month - 1, day);
  }

  findAvailableRooms(location: string, checkInDate: string, checkOutDate: string, roomCapacity: number, hotelChain: string, rating: number): Room[] {

    let hotelOptions: Hotel[] = [];
    let roomOptions: Room[] = []; 
    let availableRooms: Room[] = [];

    //getting all hotels in the city with the desired rating

    if(location !== 'any') {
      for(const h of this.hotels) {
        let address: Address;
        address = this.addresses.find(address => address.id === h.addressID) as Address;
        if(address.city === location && h.rating >= rating) {
          hotelOptions.push(h);
        }
      }
    } else {
      hotelOptions = this.hotels.filter(hotel => hotel.rating >= rating);
    }

    //filtering hotels by chain
    if (hotelChain !== 'any') {
      let chain = this.chains.find(chain => chain.name === hotelChain);
      if (chain) {
        let chainID = chain.id;
        hotelOptions = hotelOptions.filter(hotel => hotel.chainID === chainID);
      }
    }

    //getting all room within the hotel options
    for(const h of hotelOptions) {
      for(const r of this.rooms) {
        if(r.hotelId === h.id && r.capacity >= roomCapacity) {
          roomOptions.push(r);
        }
      }
    }

    //getting all bookings within the date range
    let bookings: Booking[] = [];
    for(const r of roomOptions) {
      let available = true;

      for(const b of this.bookings) {
        if(!available) {
          break;
        }

        let desiredCheckIn = this.convertStringToDate(checkInDate);
        let desiredCheckOut = this.convertStringToDate(checkOutDate);

        let bookingCheckIn = this.convertStringToDate(b.checkInDate);
        let bookingCheckOut = this.convertStringToDate(b.checkOutDate);

        if(desiredCheckIn < bookingCheckIn && desiredCheckOut <= bookingCheckIn) {
          available = true;
        } else if(desiredCheckIn >= bookingCheckOut) {
          available = true;
        } else {
          available = false;
        }
      }

      if(available) {
        availableRooms.push(r);
      }
    }

    return availableRooms;
  }

  validateSearch(): void {
    this.validateDates();
    this.validateCapacity();

    if (this.searchForm.valid) {
      const formValues = this.searchForm.value;
      let available = this.findAvailableRooms(formValues.location, formValues.checkInDate, formValues.checkOutDate, formValues.roomCapacity, formValues.hotelChain, formValues.ratingControl);
      if(available.length > 0) {
        this.router.navigate(['/customer-login'], { queryParams: { available } });
      } else {
        alert('No available rooms found');
      }
    }
  }

  validateDates() : void {
    const checkInDateControl = this.searchForm.get('checkInDate');
    const checkOutDateControl = this.searchForm.get('checkOutDate');

    if (checkInDateControl && checkOutDateControl) {
      const checkInDate = new Date(checkInDateControl.value);
      const checkOutDate = new Date(checkOutDateControl.value);

      if (checkInDate >= checkOutDate) {
        this.searchForm.setErrors({ 'dateMismatch': true });
        alert('Check-in date must be before check-out date');
      } else {
        this.searchForm.setErrors(null);
      }
    }
    
  }

  validateCapacity(): void {
    const roomCapacityControl = this.searchForm.get('roomCapacity');
    if (roomCapacityControl) {
      const roomCapacity = roomCapacityControl.value;
      if (roomCapacity < 1 || roomCapacity > 6) {
        this.searchForm.setErrors({ 'invalidCapacity': true });
        alert('Room capacity must be at least 1 and at most 6');
      } else {
        this.searchForm.setErrors(null);
      }
    }
  }
}
