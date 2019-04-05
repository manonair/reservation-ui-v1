import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Router } from '@angular/router';
import { UserInfo } from '../auth/UserInfo';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.css']
})
export class HeadderComponent implements OnInit {

  
  userDetails: UserInfo;
  constructor(private router: Router, private service: ReservationService) { }


  ngOnInit() {
    this.userDetails =  JSON.parse (localStorage.getItem('userinfo'));
    console.log("Inside home"+this.userDetails.username);
    }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    this.router.navigate(['/user/login']);
  }
}
