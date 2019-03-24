import { Component, OnInit , EventEmitter, Output, Input} from '@angular/core';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationService } from '../service/reservation.service';
import { UserInfo } from '../auth/UserInfo';
import { isDate } from '@angular/common/src/i18n/format_date';
import { isNull } from 'util';
import { DateAdapter } from '@angular/material';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';

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
  
  
  
  
  
  //@Output() addReservation :EventEmitter<any> =new EventEmitter();
  
  //private reservationService: ReservationService;
  @Input() reservation: Reservation;
  
  user:UserInfo ;
  selectedstatus: string;
  bookingStatuses: BookingStatus[] = [
    {value: 'A', viewValue: 'Active'},
    {value: 'C', viewValue: 'Cancel'},
    {value: 'H', viewValue: 'On Hold'},
    {value: 'B', viewValue: 'BOOKED'}
  ];
  constructor(private reservationService : ReservationService) { }

  ngOnInit() {
   
  }

 


  /* onEdit(reservation:Reservation ){
    console.log("addReservation");
    this.addReservation.emit(reservation)
  } */

  onSubmit(){
    this.user =  JSON.parse (localStorage.getItem('userinfo'));
     
   // new Date(this.reservation.bookingStart);
    //console.log( this.reservation.bookingStart  );
    
    this.reservation.userId= this.user.id;
    /* var normalizedValue  = isNull(this.reservation.bookingStart) ? '' : (isDate(this.reservation.bookingStart) ? this.reservation.bookingStart.toLocaleDateString('yyyy-mm-dd hh:ii') : '' );
    this.reservation.bookingStart=new Date( normalizedValue);
    normalizedValue  = isNull(this.reservation.bookingEnd) ? '' : (isDate(this.reservation.bookingEnd) ? this.reservation.bookingEnd.toLocaleDateString('yyyy-mm-dd hh:ii') : '' );
    this.reservation.bookingEnd=new Date(normalizedValue); */
    const outParam:Reservation = this.reservation;
    
  this.reservationService.addReservation(outParam)
  .subscribe();
  console.log( 'Completed onSubmit');
     
  }


  selected(){
    console.log(this.selectedstatus)
  }



}