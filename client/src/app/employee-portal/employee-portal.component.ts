import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api-service.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Booking from '../../../../server/models/Booking';
import Hotel from '../../../../server/models/Hotel';
import Chain from '../../../../server/models/Chain';
import Customer from '../../../../server/models/Customer';
import Room from '../../../../server/models/Room';
import Employee from '../../../../server/models/Employee';
import { LoggedInUserService } from '../logged-in-user.service';
import { Subscription } from 'rxjs';


export class BookingData {
    id: number;
    customerName: string;
    roomNumber: number;
    dateBooked: Date;
    checkInDate: Date;
    checkOutDate: Date;
    isRenting: boolean;
    price: number;
    capacity: number;
    isPaid: boolean;

    constructor(id: number, customerName: string, roomNumber: number, dateBooked: Date, checkInDate: Date, checkOutDate: Date, isRenting: boolean, price: number, capacity: number, isPaid: boolean) {
      this.id = id
      this.customerName = customerName;
      this.roomNumber = roomNumber;
      this.dateBooked = dateBooked;
      this.checkInDate = checkInDate;
      this.checkOutDate = checkOutDate;
      this.isRenting = isRenting;
      this.price = price;
      this.capacity = capacity;
      this.isPaid = isPaid;
    }
}

@Component({
  selector: 'app-employee-portal',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-portal.component.html',
  styleUrl: './employee-portal.component.css'
})
export class EmployeePortalComponent {

  subscription: Subscription = new Subscription;
  bookings: Booking[] = [];
  bookingData: BookingData[] = [];
  hotels: Hotel[] = [];
  employees: Employee[] = [];
  rooms: Room[] = [];
  chains: Chain[] = [];
  customers: Customer[] = [];
  username!: string;
  password!: string;
  currentEmployee!: Employee;

  apiService: ApiService;



  constructor(private loggedInUserService: LoggedInUserService, private route: ActivatedRoute, apiService: ApiService, private router: Router) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.password = params['password'];
    });

    forkJoin({
      bookings: this.apiService.getBookings(),
      hotels: this.apiService.getHotels(),
      chains: this.apiService.getChains(),
      rooms: this.apiService.getRooms(),
      customers: this.apiService.getCustomers(),
      employees: this.apiService.getEmployees()
    }).subscribe(({ bookings, hotels, chains, rooms, customers, employees }) => {
      this.bookings = bookings;
      this.hotels = hotels;
      this.chains = chains;
      this.rooms = rooms;
      this.customers = customers;
      this.employees = employees;
      
      this.loggedInUserService.getLoggedInEmployee().subscribe(e => {
        this.currentEmployee = e;
        if(this.currentEmployee.userName === 'admin') {
            this.router.navigate(['/admin']);
        }
      });

      let employee = this.currentEmployee;
      const hotel = employee ? this.hotels.find(hotel => hotel.id === employee.hotelId) : null;
      const hotelRooms = hotel ? this.rooms.filter(room => room.hotelId === hotel.id) : [];
      const hotelBookings = hotelRooms ? this.bookings.filter(booking => hotelRooms.some(room => room.id === booking.roomId)) : [];

      if(hotel && hotelRooms.length != 0 && hotelBookings.length != 0) {
        hotelBookings.forEach(booking => {
          const customer = this.customers.find(customer => customer.id === booking.customerId);
          const room = this.rooms.find(room => room.id === booking.roomId);
          const bookingData = new BookingData(booking.id, 
                                                customer ? customer.firstName + " " + customer.lastName : '', 
                                                room ? room.id : -1, 
                                                booking.dateBooked, 
                                                booking.checkInDate, 
                                                booking.checkOutDate, 
                                                booking.isRenting, 
                                                room ? room.price : -1, 
                                                room ? room.capacity : -1, 
                                                booking.paidOnline);
          this.bookingData.push(bookingData);
        });
      }

      console.log('Bookings retreived: ');
      console.log(this.bookingData);
    });

    
  }

  goToManagerPortal() {
    const employee = this.loggedInUserService.getLoggedInEmployee().subscribe(employee => {
      if(employee.role === 'Manager') {
        this.router.navigate(['/admin']);
      } else {
        alert('You do not have permission to access this page.');
      }
    });

  }
  
  logout() {
    this.router.navigate(['/employee-login']);
  }

  bookRoom() {
    this.router.navigate(['/search-rooms'], { queryParams: { employeeID: JSON.stringify(this.currentEmployee.id) } });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
