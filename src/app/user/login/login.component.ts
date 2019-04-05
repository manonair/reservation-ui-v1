import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/auth/UserInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    username: '',
    password: '',
    client_id:'oauth2-read-write-client',
    grant_type:'password'

  }
   
  constructor(private service: ReservationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/home');
    }
    
  }



  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        //console.log(res.headers.get('Authorization'));
        var  userDetails:UserInfo=  JSON.parse (JSON.stringify(res));
         localStorage.setItem('token', userDetails.accessToken);//userinfo
        localStorage.setItem('userinfo', JSON.stringify(res));
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }


  private extractData(res: UserInfo) {
    let body = res;
    return body || {};
}



}
