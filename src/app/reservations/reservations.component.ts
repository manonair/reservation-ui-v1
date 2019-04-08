import { Component, OnInit, Input, Output } from '@angular/core';
import { Reservation } from '../model/Reservation';
import { ReservationService } from '../service/reservation.service';
import { EventEmitter } from 'protractor';
import { isNull, isDate } from 'util';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  selectedReservation: Reservation;

DEFAULT_DATE:string= '2001-01-01T00:00:00';
  @Input() reservation: Reservation;

  constructor(private reservationService: ReservationService, private router: Router) { }


  ngOnInit() {
    this.reservationService.getReservationsByUser().subscribe(reservations => {
      reservations.forEach(res => {
        
        res.bookingStart = isNull(res.bookingStart) ? new Date(this.DEFAULT_DATE) :  new Date(res.bookingStart) ;
        res.bookingEnd = isNull(res.bookingEnd) ? new Date(this.DEFAULT_DATE) :  new Date(res.bookingEnd) ;
      });
      this.reservations = reservations;
    });


  }

  deleteReservation(reservation: Reservation) {
    console.log('Delete Reservation !');
    if (confirm('Are you sure you want to delete this?')) {
      // TODO:  Do something here if the answer is "Ok".
      this.reservationService.deleteReservation(reservation).subscribe(
        status => {
          if (status) {
            this.reservations = this.reservations.filter(rs => rs.tableReservationId !== reservation.tableReservationId);
          }
        }
      );
    }
  }

  getAvailableTables() {
    console.log('Get Available Tables to Book !');
    this.reservationService.getAvailableTables().subscribe(reservations => {
      reservations.forEach(res => {
        res.bookingStart = isNull(res.bookingStart) ? new Date(this.DEFAULT_DATE) :  new Date(res.bookingStart) ;
        res.bookingEnd = isNull(res.bookingEnd) ? new Date(this.DEFAULT_DATE) :  new Date(res.bookingEnd) ;
      });
      this.reservations = reservations;
    });

  }

  addReservation(reservation: Reservation) {
    console.log('Add  Reservation Service CAll  !');
    
    this.reservationService.addReservation(reservation)
      .subscribe(
        reservation => this.reservations.push(reservation)
      );
    this.selectedReservation = null;
    this.router.navigate(['/']);
  }

  editReservation(reservation: Reservation) {
    console.log('Edit Reservation ! @ Edit Page');

    reservation.bookingStart = isNull(reservation.bookingStart) ? new Date(this.DEFAULT_DATE) :  new Date(reservation.bookingStart) ;
    reservation.bookingEnd = isNull(reservation.bookingEnd) ? new Date(this.DEFAULT_DATE) :  new Date(reservation.bookingEnd) ;
     this.selectedReservation = reservation;
  }





}
