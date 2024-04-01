import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Customer from '../../../server/models/Customer';
import Employee from '../../../server/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private loggedInUser = new BehaviorSubject<any>('');
  isCustomer: boolean = false;
  isEmployee: boolean = false;

  setLoggedInCustomer(user: Customer) {
    this.loggedInUser.next(user);
    this.isCustomer = true;
    this.isEmployee = false;
  }

  setLoggedInEmployee(user: Employee) {
    this.loggedInUser.next(user);
    this.isEmployee = true;
    this.isCustomer = false;
  }

  getLoggedInEmployee() : Observable<Employee> {
    return this.loggedInUser.asObservable();
  }

  getLoggedInCustomer() : Observable<Customer> {
    return this.loggedInUser.asObservable();
  }

  isCustomerLoggedIn() : boolean {
    return this.isCustomer;
  }

  isEmployeeLoggedIn() : boolean {
    return this.isEmployee;
  }

  userSignedIn() : boolean {
    return this.isCustomer || this.isEmployee;
  }

  logOut() {
    this.loggedInUser.next('');
    this.isCustomer = false;
    this.isEmployee = false;
  }
  

}
