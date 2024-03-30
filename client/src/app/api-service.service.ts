import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Customer from '../../../server/models/Customer';
import Archive from '../../../server/models/Archive';
import Address from '../../../server/models/Address';
import Booking from '../../../server/models/Booking';
import Room from '../../../server/models/Room';
import Hotel from '../../../server/models/Hotel';
import Chain from '../../../server/models/Chain';
import Employee from '../../../server/models/Employee';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000'; // Base URL of your backend API

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    
    return this.http.get<Customer[]>(`${this.baseUrl}/getCustomers`);

  }

  getArchives(): Observable<Archive[]> {
    return this.http.get<Archive[]>(`${this.baseUrl}/getArchive`);
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/getAddresses`);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/getBookings`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/getEmployees`);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getRooms`);
  }

  getHotels(): Observable<Hotel[]> {  
    return this.http.get<Hotel[]>(`${this.baseUrl}/getHotels`);
  }

  getChains(): Observable<Chain[]> {
    return this.http.get<Chain[]>(`${this.baseUrl}/getChains`);
  }

  getCustomerByID(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/getCustomer/${id}`);
  }

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customerByEmail/${email}`);
  }

  getEmployeeByID(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employee/${id}`);
  }

  getEmployeeByUsername(username: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employeeByUsername/${username}`);
  }

  getHotelsByChainID(chainID: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotelsByChainID/${chainID}`)
  }

  getHotelsByRating(rating: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotelsByRating/${rating}`);
  }

  getHotelsByCity(city: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotelsByCity/${city}`);
  }

  getHotelByID(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/hotel/${id}`);
  }

  getChainByID(id: number): Observable<Chain> {
    return this.http.get<Chain>(`${this.baseUrl}/chain/${id}`);
  }

  getHotelRatingByID(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/hotelRating/${id}`);
  }

  getHotelNumRoomsByID(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/hotelNumRooms/${id}`);
  }

  getRoomByID(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/room/${id}`);
  }

  getArchiveByID(id: number): Observable<Archive> {
    return this.http.get<Archive>(`${this.baseUrl}/archive/${id}`);
  }

  getRoomsByHotelID(hotelID: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/roomsByHotelID/${hotelID}`)
  }

  getBookingsByRoomID(roomID: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookingsByRoomID/${roomID}`)
  }

  getRoomsWithinPriceRange(minPrice: number, maxPrice: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/roomsWithinPriceRange/${minPrice}/${maxPrice}`)
  }

  getRoomsBySeaView(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/roomsBySeaView`);
  }

  getRoomsByMountainView(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/roomsByMountainView`);
  }

  getRoomsByExtendable(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/roomsByExtendable`);
  }

  getBookingsByCustomerID(customerID: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookingsByCustomerID/${customerID}`);
  }

  getArchiveByCustomerID(customerID: number): Observable<Archive[]> {
    return this.http.get<Archive[]>(`${this.baseUrl}/archiveByCustomerID/${customerID}`);
  }

  getAddressByID(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/address/${id}`);
  }

  getBookingByID(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/booking/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    console.log("Reached createCustomer in api-service");
    return this.http.post<Customer>(`${this.baseUrl}/createCustomer`, customer);
  }

  createAddress(address: Address): Observable<Address> {
    console.log("Reached createAddress in api-service");
    return this.http.post<Address>(`${this.baseUrl}/createAddress`, address);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/createBooking`, booking);
  }



}
