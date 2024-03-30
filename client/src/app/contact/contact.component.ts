import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api-service.service';import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import Chain from '../../../../server/models/Chain';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  apiService: ApiService;
  chains: Chain[] = [];

  constructor(apiService: ApiService, private router: Router) {
    this.apiService = apiService;
  }

  ngOnInit() {
    console.log('Contact Component Initialized');
    forkJoin({
      chains: this.apiService.getChains()
    
    }).subscribe(({ chains }) => {
      this.chains = chains;
    }); 
  }

}