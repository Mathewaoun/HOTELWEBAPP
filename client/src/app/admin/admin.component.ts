import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor() { }

  ngOnInit() {
    console.log('Admin Component Initialized');
  }

  

}
