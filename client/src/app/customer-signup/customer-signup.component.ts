import { Component, OnInit, OnDestroy} from '@angular/core';
import { ApiService } from '../api-service.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggedInUserService } from '../logged-in-user.service';
import { Subscription } from 'rxjs';

import Customer from '../../../../server/models/Customer';
import Address from '../../../../server/models/Address';

@Component({
  selector: 'app-customer-singup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.css'
})
export class CustomerSignupComponent {

  signupForm: FormGroup;
  subscription: Subscription = new Subscription;
  apiService: ApiService;
  customer!: Customer;
  address!: Address;
  billingAddress!: Address;
  customers: Customer[] = [];
  provinces = ['Alberta', 
                'British Columbia', 
                'Manitoba', 
                'New Brunswick', 
                'Newfoundland and Labrador', 
                'Nova Scotia', 
                'Ontario', 
                'Prince Edward Island', 
                'Quebec', 
                'Saskatchewan'];




  constructor(private loggedInUserService: LoggedInUserService, private router: Router, private fb: FormBuilder, apiService: ApiService) {
    this.apiService = apiService;
    this.signupForm = this.fb.group({
      identification: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      homeStreet: [''],
      homeApt: [''],
      homePostalCode: [''],
      homeProvince: [''],
      homeCity: [''],
      cardHolderName: [''],
      cardNumber: [''],
      cardExpiry: [''],
      cardCVV: [''],
      billingStreet: [''],
      billingApt: [''],
      billingPostalCode: [''],
      billingProvince: [''],
      billingCity: ['']
    });
  }

  ngOnInit() {
    console.log('Customer SignUp Component Initialized');

    forkJoin({
      customers: this.apiService.getCustomers()
    }).subscribe(({ customers }) => {
      this.customers = customers;
    });
  }


  validateFields() : void {
    const identification = this.signupForm.get('identification');
    const firstName = this.signupForm.get('firstName');
    const lastName = this.signupForm.get('lastName');
    const email = this.signupForm.get('email');
    const password = this.signupForm.get('password');
    const homeStreet = this.signupForm.get('homeStreet');
    const homeApt = this.signupForm.get('homeApt');
    const homePostalCode = this.signupForm.get('homePostalCode');
    const homeProvince = this.signupForm.get('homeProvince');
    const homeCity = this.signupForm.get('homeCity');
    const cardHolderName = this.signupForm.get('cardHolderName');
    const cardNumber = this.signupForm.get('cardNumber');
    const cardExpiry = this.signupForm.get('cardExpiry');
    const cardCVV = this.signupForm.get('cardCVV');
    const billingStreet = this.signupForm.get('billingStreet');
    const billingApt = this.signupForm.get('billingApt');
    const billingPostalCode = this.signupForm.get('billingPostalCode');
    const billingProvince = this.signupForm.get('billingProvince');
    const billingCity = this.signupForm.get('billingCity');

    if(identification && firstName && lastName && email && password && homeStreet && homePostalCode && homeProvince && homeCity && cardHolderName && cardNumber && cardExpiry && cardCVV && billingStreet && billingPostalCode && billingProvince && billingCity) {
      const id = identification.value;
      const fname = firstName.value;
      const lname = lastName.value;
      const mail = email.value;
      const pass = password.value;
      const hstreet = homeStreet.value;
      const hapt = homeApt ? homeApt.value : '';
      const hpostal = homePostalCode.value;
      const hprov = homeProvince.value;
      const hcity = homeCity.value;
      const chname = cardHolderName.value;
      const cnum = cardNumber.value;
      let cexp = new Date(cardExpiry.value);
      const cvv = cardCVV.value;
      const bstreet = billingStreet.value;
      const bapt = billingApt ? billingApt.value : '';
      const bpostal = billingPostalCode.value;
      const bprov = billingProvince.value;
      const bcity = billingCity.value;

      if (id === '' || fname === '' || lname === '' || mail === '' || pass === '' || hstreet === '' || hpostal === '' || hprov === '' || hcity === '' || chname === '' || cnum === '' || cvv === '' || bstreet === '' || bpostal === '' || bprov === '' || bcity === '') {
        alert('Please fill out all fields.');
        return;
      }


      
      const expiry = this.formatDate(cexp);

      if(this.validateEmail(mail) && this.validatePassword(pass) && this.validatePostalCode(hpostal) && this.validatePostalCode(bpostal) && this.validateCardNumber(cnum)) {
        this.signupCustomer(id, fname, lname, mail, pass, hstreet, hapt, hpostal, hprov, hcity, chname, cnum, expiry, cvv, bstreet, bapt, bpostal, bprov, bcity);
      }

    } else {
      alert('Please fill out all fields.');
    }
  }

  validateEmail(email: string) : boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    for(const c of this.customers) {
      if(c.email === email) {
        alert('An account with this email already exists.');
        return false;
      }
    }

    return true;
  }

  validatePassword(password: string) : boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one letter and one number.' + password);
      return false;
    }
    return true;
  }

  validatePostalCode(postalCode: string) : boolean {
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!postalCodeRegex.test(postalCode)) {
      alert('Please enter a valid postal code.');
      return false;
    }
    return true;
  }

  validateCardNumber(cardNumber: number) : boolean {
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber.toString())) {
      alert('Please enter a valid 16-digit card number.');
      return false;
    }
    return true;
  }

  formatDate(date: Date) : string {
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${month}/${year}`;
  }

  signupCustomer(id: string, fname: string, lname: string, email: string, password: string, homeStreet: string, homeApt: string, homePostal: string, homeProv: string, homeCity: string, cardHolderName: string, cardNumber: number, cardExpiry: string, cardCVV: string, billingStreet: string, billingApt: string, billingPostal: string, billingProv: string, billingCity: string) : void {

    alert("Congrats! You have successfully signed up.");
    console.log('Customer name: ' + fname + ' ' + lname);
    console.log('Customer email: ' + email);
    console.log('Customer password: ' + password);
    console.log('Customer home address: ' + homeStreet + ' ' + homeApt + ', ' + homeCity + ', ' + homeProv + ' ' + homePostal);
    console.log('Customer billing address: ' + billingStreet + ' ' + billingApt + ', ' + billingCity + ', ' + billingProv + ' ' + billingPostal);
    console.log('Customer card holder name: ' + cardHolderName);
    console.log('Customer card number: ' + cardNumber);
    console.log('Customer card expiry: ' + cardExpiry);
    console.log('Customer card CVV: ' + cardCVV);

    this.address = new Address(-1, homeStreet, homeApt, homePostal, homeProv, homeCity);
    this.billingAddress = new Address(-1, billingStreet, billingApt, billingPostal, billingProv, billingCity);
    

    forkJoin({
      home: this.apiService.createAddress(this.address),
      billing: this.apiService.createAddress(this.billingAddress),
    }).subscribe(({ home, billing }) => {});

    forkJoin({
      addresses: this.apiService.getAddresses()
    }).subscribe(({ addresses }) => {
      let homeFound = false;
      let billingFound = false;

      // iterate through the addresses to find the home and billing addresses
      for(const a of addresses) {
        if(homeFound && billingFound) {
          break;
        }
        if(a.street === homeStreet && a.apt === homeApt && a.postalCode === homePostal && a.province === homeProv && a.city === homeCity) {
          this.address = a;
          homeFound = true;
        }
        if(a.street === billingStreet && a.apt === billingApt && a.postalCode === billingPostal && a.province === billingProv && a.city === billingCity) {
          this.billingAddress = a;
          billingFound = true;
        }
      }

      if(!(billingFound && homeFound)) {
        alert('Error creating address. Address ID: ' + this.address.id + ' Billing ID: ' + this.billingAddress.id);
        return;
      }

    });

    if(this.address.id !== 1 && this.billingAddress.id !== 1) {
      this.customer = new Customer(-1, id, fname, lname, email, password, this.address, this.billingAddress, cardHolderName, cardNumber, cardExpiry, cardCVV);
      forkJoin({
        customer: this.apiService.createCustomer(this.customer)
      }).subscribe(({ customer }) => {
        console.log("Customer: " + customer);
      });

      this.loggedInUserService.setLoggedInCustomer(this.customer);
    }
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

