import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../auth/UserInfo';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';
import { HttpParamsOptions } from '@angular/common/http/src/params';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

 
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly BaseURI = 'http://localhost:1111/api/user-service/';
  readonly reservation_URL: string = 'http://localhost:1111/api/roster-microservice/reservation';

  readonly allReservations_URL: string = 'all';
  readonly userReservations_URL: string = 'user';
  readonly getAllTables_URL = 'tables';
  readonly deleteReservation_URL = 'delete';
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


  getAvailableTables(): Observable<Reservation[]> {
    var url = `${this.reservation_URL}/${this.getAllTables_URL}`;
    this.setRegularHeader();
    console.log('URL: ' + url);
    return this.http.get<Reservation[]>(url, httpOptions);

  }


  private  setRegularHeader()  {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');


  
  }


  private  setSecureHeader()  {
    httpOptions.headers.append('Authorization', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
  
  }

  getReservations(): Observable<Reservation[]> {
    var url = `${this.reservation_URL}/${this.allReservations_URL}`;
   
    this.setRegularHeader();
    return this.http.get<Reservation[]>(url, httpOptions);
  }


  getReservationsByUser(): Observable<Reservation[]> {
    this.userDetails = JSON.parse(localStorage.getItem('userinfo'));
    var url = `${this.reservation_URL}/${this.userReservations_URL}/${this.userDetails.id}`;
    this.setRegularHeader();
    return this.http.get<Reservation[]>(url, httpOptions);
  }


  deleteReservation(reservation: Reservation): Observable<any> {
    var url = `${this.reservation_URL}/${this.deleteReservation_URL}/${reservation.tableReservationId}`;
    this.setRegularHeader();
    console.log('URL: ' + url);
    return this.http.post<Reservation>(url, httpOptions);

  }

 


  addReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${this.reservation_URL}/add`;
    console.log('Add URL: ' + url);
    return this.http.post<Reservation>(url, reservation, httpOptions);

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

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    console.log(JSON.stringify(formData));

    var reqHeader = new HttpHeaders({
      // Client secrit encoded
      "authorization": "Basic b2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50Om9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudC1wYXNzd29yZHJ3MTIz",
     "content-type": "application/json;charset=UTF-8",
      "No-Auth": "True",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true" ,
      "Access-Control-Allow-Methods" : "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      // "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type, Authorization, Content-Length, X-Requested-With",
      "Access-Control-Allow-Header": "true"
    });
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
