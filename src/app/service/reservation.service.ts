import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../auth/UserInfo';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { isDate } from 'moment';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

 
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly BaseURI = 'http://localhost:1111/api/user-service';
  readonly reservation_URL: string = 'http://localhost:1111/api/roster-microservice/reservation';

  readonly allReservations_URL: string = 'all';
  readonly userReservations_URL: string = 'user';
  readonly getAllTables_URL = 'tables';
  readonly deleteReservation_URL = 'delete';
  readonly userRegistratuin_URL = 'user/create';
  readonly login_URL = 'http://localhost:1111/api/user-service/login';




  userDetails: UserInfo;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  private getHeaderWithToken() {
    
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Origin, x-requested-with, Authorization, content-type, Access-Control-Allow-Origin",
      //"Access-Control-Allow-Credentials": "true",
      "Authorization": "Bearer " + localStorage.getItem("token")
      
    });
  }
  
  private getSecureHeader() {
    return new HttpHeaders({
      // Client secrit encoded
      "authorization": "Basic b2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50Om9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudC1wYXNzd29yZHJ3MTIz",
      "content-type": "application/json;charset=UTF-8",
     // "No-Auth": "True",
      //"Access-Control-Allow-Origin": "*",
      ///"Access-Control-Allow-Credentials": "true",
      //"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      //"Access-Control-Allow-Headers": "Origin, x-requested-with, Authorization, content-type, Access-Control-Allow-Origin"
     
    });
  }
  
  getAvailableTables(): Observable<Reservation[]> {
    var url = `${this.reservation_URL}/${this.getAllTables_URL}`;
    var reqHeader =  this.getHeaderWithToken();
    console.log('URL: ' + url);
    return this.http.get<Reservation[]>(url, { headers: reqHeader });

  }


  getReservations(): Observable<Reservation[]> {
    var url = `${this.reservation_URL}/${this.allReservations_URL}`;
    var reqHeader =  this.getHeaderWithToken();
    return this.http.get<Reservation[]>(url, { headers: reqHeader });
  }


  getReservationsByUser(): Observable<Reservation[]> {
    this.userDetails = JSON.parse(localStorage.getItem('userinfo'));
    var url = `${this.reservation_URL}/${this.userReservations_URL}/${this.userDetails.id}`;
    
   var reqHeader = this.getHeaderWithToken();

     

    return this.http.get<Reservation[]>(url, { headers: reqHeader });
  }


 

  deleteReservation(reservation: Reservation): Observable<any> {
    var url = `${this.reservation_URL}/${this.deleteReservation_URL}/${reservation.tableReservationId}`;
    var reqHeader = this.getHeaderWithToken();
    console.log('URL: ' + url);
    return this.http.post<Reservation>(url, { headers: reqHeader });

  }

 


  addReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${this.reservation_URL}/add`;
   
    console.log('Add URL: ' + url);
    var reqHeader = this.getHeaderWithToken();
    return this.http.post<Reservation>(url, reservation, { headers: reqHeader });

  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register(userRegistrationForm) {
  alert('Here');
     
    var user = {
      username: userRegistrationForm.value.username,
      email: userRegistrationForm.value.email,
      lastName: userRegistrationForm.value.lastName,
      firstName: userRegistrationForm.value.firstName,
      password: this.formModel.value.password
    };
    var url = `${this.BaseURI}/${this.userRegistratuin_URL}`;
    var reqHeader = this.getSecureHeader();
    console.log('URL: ' + url);
    return this.http.post(url, user, { headers: reqHeader });
     
  }

  login(formData) {
    console.log(JSON.stringify(formData));

    var reqHeader = this.getSecureHeader();
  return this.http.post(this.login_URL, formData, { headers: reqHeader });
  }

 

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  jsonToURI(jsonObj) {
    var output = '';
    var keys = Object.keys(jsonObj);
    keys.forEach(function (key) {
      output = output + key + '=' + jsonObj[key] + '&';
    })
    return output.slice(0, -1);
  }

}
