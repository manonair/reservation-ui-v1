import { Component, OnInit , EventEmitter, Output, Input} from '@angular/core';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationService } from '../service/reservation.service';
import { UserInfo } from '../auth/UserInfo';
import { isDate } from '@angular/common/src/i18n/format_date';
import { isNull } from 'util';
import { DateAdapter } from '@angular/material';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';
import { Router } from '@angular/router';

export interface BookingStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
 
  @Input() reservation: Reservation;
  
  user:UserInfo ;
  selectedstatus: string;
  bookingStatuses: BookingStatus[] = [
    {value: 'A', viewValue: 'Active'},
    {value: 'C', viewValue: 'Cancel'},
    {value: 'H', viewValue: 'On Hold'},
    {value: 'B', viewValue: 'BOOKED'}
  ];
  constructor(private reservationService : ReservationService, private router: Router) { }

  ngOnInit() {
   
  }
 
  onSubmit(){
    this.user =  JSON.parse (localStorage.getItem('userinfo'));
  this.reservation.userId= this.user.id;
  
    const outParam:Reservation = this.reservation;
    
  this.reservationService.addReservation(outParam)
  .subscribe( );
  this.reservation=null;
  console.log( 'Completed onSubmit');
  this.router.navigate(['home']);
     }


  selected(){
    console.log(this.selectedstatus)
  }



}