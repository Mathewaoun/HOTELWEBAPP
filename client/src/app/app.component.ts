import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  searchForm: FormGroup;
  chains: Chain[] = [];
  hotels: Hotel[] = [];
  rooms: Room[] = [];
  addresses: Address[] = [];
  hotelLocations: Address[] = [];
  bookings: Booking[] = [];

  apiService: ApiService;

  constructor(private fb: FormBuilder,apiService: ApiService) {
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
    console.log("Search button clicked");
    if (this.searchForm.valid) {
      const formValues = this.searchForm.value;
      console.log("Form Values: " + formValues.location, formValues.checkInDate, formValues.checkOutDate, formValues.roomCapacity, formValues.hotelChain, formValues.ratingControl);
      let available = this.findAvailableRooms(formValues.location, formValues.checkInDate, formValues.checkOutDate, formValues.roomCapacity, formValues.hotelChain, formValues.ratingControl);
      console.log("Available room: ");
      console.log(available);
    } else {
      console.log('Form is invalid');
    }
  }

  
}
