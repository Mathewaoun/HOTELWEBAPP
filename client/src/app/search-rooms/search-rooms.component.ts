import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '.././api-service.service';
import { ActivatedRoute } from '@angular/router';
import Customer from '../../../../server/models/Customer';
import Archive from '../../../../server/models/Archive';
import Address from '../../../../server/models/Address';
import Booking from '../../../../server/models/Booking';
import Room from '../../../../server/models/Room';
import Hotel from '../../../../server/models/Hotel';
import Chain from '../../../../server/models/Chain';
import Employee from '../../../../server/models/Employee';

import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';


export class RoomData {
  id: number;
  price: number;
  capacity: number;
  chainName: string;
  roomRating: string;
  address: string;
  amenities: string;
  mountainView: string;
  seaView: string;
  extendable: string;

  constructor(id: number, price: number, capacity: number, chainName: string, roomRating: string, address: string, amenities: string, mountainView: boolean, seaView: boolean, extendable: boolean) {
    this.id = id;
    this.price = price;
    this.capacity = capacity;
    this.chainName = chainName;
    this.roomRating = roomRating;
    this.address = address;
    this.amenities = '';
    
    this.amenities = amenities;
    this.mountainView = mountainView ? 'Yes' : 'No';
    this.seaView = seaView ? 'Yes' : 'No';
    this.extendable = extendable ? 'Yes' : 'No';
  }
}


@Component({
  selector: 'app-search-rooms',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './search-rooms.component.html',
  styleUrl: './search-rooms.component.css'
})
export class SearchRoomsComponent {
  searchForm: FormGroup;
  filterForm: FormGroup;
  apiService: ApiService;

  chains: Chain[] = [];
  hotels: Hotel[] = [];
  rooms: Room[] = [];
  addresses: Address[] = [];
  hotelLocations: Address[] = [];
  bookings: Booking[] = [];
  available: Room[] = [];
  allRoomData: RoomData[] = [];
  availableRoomData: RoomData[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder,apiService: ApiService, private router: Router) {
    this.apiService = apiService;
    this.searchForm = this.fb.group({
      location: [''],
      checkInDate: [''],
      checkOutDate: [''],
      roomCapacity: [''],
      hotelChain: [''],
      ratingControl: ['']
    });

    this.filterForm = this.fb.group({
      sortOption: [''],
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

      this.getHotelLocations();
      this.getAllRoomData();
      
      this.route.queryParams.subscribe(params => {
        const availableRoomsFromQuery = params['availableRooms'];
        if (availableRoomsFromQuery) {
          this.availableRoomData = availableRoomsFromQuery;
        }
      });

    });
  }

  getAllRoomData(): void {
    for (let room of this.rooms) {
      let hotel = this.hotels.find(hotel => hotel.id === room.hotelId);
      let address = this.addresses.find(address => address.id === hotel?.addressID);
      let chain = this.chains.find(chain => chain.id === hotel?.chainID);
      let rating = hotel ? hotel.rating : 0;
      let roomRating = '';
      for (let i = 0; i < rating; i++) {
        roomRating += '⭐';
      }
      let roomData = new RoomData(room.id, room.price, room.capacity, chain?.name || '', roomRating, address?.city || '', room.amenities, room.mountainView, room.seaView, room.extendable);
      this.allRoomData.push(roomData);
    }
  }

  getHotelByRating(rating: number): Hotel[] { 
    return this.hotels.filter(hotel => hotel.rating >= rating);
  }

  getHotelLocations(): void {
    
    for (let hotel of this.hotels) {

      let address = this.addresses.find(address => address.id === hotel.addressID) as Address;
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
    this.validateDates();
    this.validateCapacity();

    if (this.searchForm.valid) {
      const formValues = this.searchForm.value;
      this.available = this.findAvailableRooms(formValues.location, formValues.checkInDate, formValues.checkOutDate, formValues.roomCapacity, formValues.hotelChain, formValues.ratingControl);
      if(this.available.length > 0) {
        this.formatRooms();
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

  formatRooms(): void {

    // for every room in this.available, push the RoomData object to this.availableRoomData from this.allRoomData
    this.availableRoomData = [];
    for (let room of this.available) {
      let roomData = this.allRoomData.find(roomData => roomData.id === room.id);
      if (roomData) {
        this.availableRoomData.push(roomData);
      }
    }
  
  }

  filterRooms(): void {
    const sortOption = this.filterForm.get('sortOption')?.value;
    if (sortOption === 'alphabetical') {
      this.validateSearch();
      this.availableRoomData.sort((a, b) => a.address.localeCompare(b.address));
    } else if (sortOption === 'priceLowToHigh') {
      this.validateSearch();
      this.availableRoomData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      this.validateSearch();
      this.availableRoomData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'ratingLowToHigh') {
      this.validateSearch();
      this.availableRoomData.sort((a, b) => a.roomRating.length - b.roomRating.length);
    } else if (sortOption === 'ratingHighToLow') {
      this.validateSearch();
      this.availableRoomData.sort((a, b) => b.roomRating.length - a.roomRating.length);
    } else if (sortOption === 'mountainView') {
      this.availableRoomData = this.availableRoomData.filter(room => room.mountainView === 'Yes');
    } else if (sortOption === 'seaView') {
      this.availableRoomData = this.availableRoomData.filter(room => room.seaView === 'Yes');
    } else if (sortOption === 'extendable') {
      this.availableRoomData = this.availableRoomData.filter(room => room.extendable === 'Yes');
    }
  }

}
