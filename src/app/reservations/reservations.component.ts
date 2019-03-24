import { Component, OnInit, Input, Output } from '@angular/core';
import { Reservation } from '../model/Reservation';
import { ReservationService } from '../service/reservation.service';
import { EventEmitter } from 'protractor';
import { isNull, isDate } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  selectedReservation: Reservation;


  @Input() reservation:Reservation;
 
  constructor(private reservationService : ReservationService) { }

  ngOnInit() {

    this.reservationService.getReservationsByUser().subscribe(reservations=>{
      this.reservations=reservations;
    });

  }

  deleteReservation(reservation:Reservation){
    console.log('Delete Reservation !');
    this.reservations.filter(t=>t.tableReservationId!=reservation.tableReservationId);
    this.reservationService.deleteReservation(reservation).subscribe();
  }

 /*  addReservation(reservation:Reservation){
    console.log('Add  Reservation Service CAll  !');
    this.reservationService.addReservation(reservation)
    .subscribe(
      reservation=>this.reservations.push(reservation)
          );
  } */

  editReservation(reservation:Reservation){
    console.log('Edit Reservation ! @ Add Page');
    reservation.bookingStart = isNull(reservation.bookingStart) ? new Date() : (isDate(reservation.bookingStart) ? moment(Number(reservation.bookingStart)).toDate() : new Date() );
     reservation.bookingEnd  = isNull(reservation.bookingEnd) ? new Date() : (isDate(reservation.bookingEnd) ? moment(Number(reservation.bookingEnd)).toDate() : new Date() );
       
    this.selectedReservation=reservation;
 
  }



    
  
}
