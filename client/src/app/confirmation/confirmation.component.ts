import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationNumber: string | null = '';

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    this.confirmationNumber = params.get('confirmationNumber');
  }
}
