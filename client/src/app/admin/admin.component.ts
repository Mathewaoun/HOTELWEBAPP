import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Chain from '../../../../server/models/Chain';
import Room from '../../../../server/models/Room';
import Hotel from '../../../../server/models/Hotel';
import Address from '../../../../server/models/Address';
import Employee from '../../../../server/models/Employee';
import { LoggedInUserService } from '../logged-in-user.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  chains: Chain[] = [];
  rooms: Room[] = [];
  hotels: Hotel[] = [];
  employees: Employee[] = [];
  hotelsOfChain: Hotel[] = [];
  roomsOfHotel: Room[] = [];
  employeesOfHotel: Employee[] = [];
  addresses: Address[] = [];
  apiService: ApiService;
  currentView: string = "chains";
  selectedChain: Chain;
  selectedHotel: Hotel;
  hotelAddresses: Address[] = [];
  subscription: Subscription = new Subscription;
  adminLoggedIn: boolean = true;

  constructor(private loggedInUserService: LoggedInUserService, private route: ActivatedRoute, apiService: ApiService, private router: Router) {
    this.loggedInUserService.getLoggedInEmployee().subscribe(employee => {
      if(employee.userName !== 'admin') {
        this.adminLoggedIn = false;
        this.currentView = 'hotels';
      }
    });
    this.apiService = apiService;
    this.selectedChain = new Chain();
    this.selectedHotel = new Hotel();
  }

  ngOnInit() {
    

    forkJoin({
      chains: this.apiService.getChains(),
      rooms: this.apiService.getRooms(),
      hotels: this.apiService.getHotels(),
      addresses: this.apiService.getAddresses(),
      employees: this.apiService.getEmployees()
    }).subscribe(({chains, rooms, hotels, addresses, employees}) => {
      this.chains = chains;
      this.rooms = rooms;
      this.hotels = hotels;
      this.addresses = addresses;
      this.employees = employees;
      this.loggedInUserService.getLoggedInEmployee().subscribe(employee => {
        if(employee.userName !== 'admin') {
          this.adminLoggedIn = false;
          this.currentView = 'hotels';
          this.hotelsOfChain = this.hotels.filter(hotel => employee.hotelId === hotel.id);
          
        }
      });
    });
  }

  loadData() : void {
    forkJoin({
      chains: this.apiService.getChains(),
      rooms: this.apiService.getRooms(),
      hotels: this.apiService.getHotels(),
      addresses: this.apiService.getAddresses(),
      employees: this.apiService.getEmployees()
    }).subscribe(({chains, rooms, hotels, addresses, employees}) => {
      this.chains = chains;
      this.rooms = rooms;
      this.hotels = hotels;
      this.addresses = addresses;
      this.employees = employees;
    });
  }

  viewHotels(chain: Chain) : void {
    this.currentView = 'hotels';
    this.selectedChain = chain;
    this.hotelsOfChain = this.hotels.filter(hotel => hotel.chainID === chain.id);
  }

  viewRooms(hotel: Hotel) : void {
    this.selectedHotel = hotel;
    this.currentView = 'rooms';
    this.roomsOfHotel = this.rooms.filter(room => room.hotelId === hotel.id);
    
  }

  viewEmployees(hotel: Hotel) : void {
    this.employeesOfHotel = [];
    for(const e of this.employees) {
      if(e.hotelId === hotel.id) {
        this.employeesOfHotel.push(e);
      }
    }
    this.currentView = 'employees';
  }

  deleteEmployee(employee: Employee) : void {

    this.loggedInUserService.getLoggedInEmployee().subscribe(loggedInEmployee => {
      if(loggedInEmployee.id === employee.id) {
        alert('You cannot delete yourself.');
      } else {
        this.apiService.deleteEmployee(employee).subscribe();
        this.loadData();
      }
    });
    
  }

  deleteRoom(room: Room) : void {
    this.apiService.deleteRoom(room).subscribe();
    this.loadData();
  }
  
  deleteHotel(hotel: Hotel) : void {
    let roomsOfHotel = this.rooms.filter(room => room.hotelId === hotel.id);
    let employeesOfHotel = this.employees.filter(employee => employee.hotelId === hotel.id);

    this.apiService.deleteHotel(hotel).subscribe(() => {
      for(const room of roomsOfHotel) {
        this.deleteRoom(room);
      }
      for(const employee of employeesOfHotel) {
        this.deleteEmployee(employee);
      }
    });
  
    this.loadData();
  }

  deleteChain(chain: Chain) : void {
    let hotelsOfChain = this.hotels.filter(hotel => hotel.chainID === chain.id);

    alert("Deleting a chain will delete all hotels, rooms, and employees associated with it. Are you sure you want to delete this chain?");
    this.apiService.deleteChain(chain).subscribe(() => {
      for(const hotel of hotelsOfChain) {
        this.deleteHotel(hotel);
      }
    });

  }

  getHotelAddress(hotel: Hotel) : string {
    let address = this.addresses.find(address => address.id === hotel.addressID);
    if (address) {
      return address.street + ', ' + address.apt + ', ' + address.postalCode + ' ' + address.city + ', ' + address.province;
    } else {
      return '';
    }
  }

  getChainAddress(chain: Chain) : string {
    let address = this.addresses.find(address => address.id === chain.addressId);
    if (address) {
      return address.street + ', ' + address.apt + ', ' + address.postalCode + ' ' + address.city + ', ' + address.province;
    } else {
      return '';
    }
  }

  goBack() : void {
    if(this.currentView === 'hotels' && this.adminLoggedIn) {
      this.currentView = 'chains';
    } else if(this.currentView === 'rooms') {
      this.currentView = 'hotels';
    } else if(this.currentView === 'employees') {
      this.currentView = 'hotels';
    } else if(this.currentView === 'hotels' && !this.adminLoggedIn) {
      this.router.navigate(['/employee-portal']);
    }
  }

  convertBool(b: boolean) : string {
    return b ? 'Yes' : 'No';
  }

  getRatingInStars(rating: number) : string {
    let stars = '';
    for(let i = 0; i < rating; i++) {
      stars += '⭐';
    }
    return stars;
  }

  

}
