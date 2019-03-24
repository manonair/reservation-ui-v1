import { Component, OnInit , Input, EventEmitter, Output} from '@angular/core';
import { Reservation } from 'src/app/model/Reservation';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {

  @Input() reservation:Reservation;
  @Output()deleteReservation:EventEmitter<Reservation> = new EventEmitter();
  @Output()editReservation:EventEmitter<Reservation> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelete(reservation:Reservation ){
    this.deleteReservation.emit(reservation)
  }


}
