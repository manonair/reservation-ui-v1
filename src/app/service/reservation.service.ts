import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../auth/UserInfo';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' 
  })
}

    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationURL:string='http://localhost:1111/api/roster-microservice/reservation';
  //reservationURL:string='https://my-json-server.typicode.com/manonair/demo/tableReservations';
  allReservations :string= 'all';
  userReservations :string= 'user';
  readonly BaseURI = 'http://localhost:1111/api/user-service/';
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



  
   
  getReservations():Observable<Reservation[]>{
    const url = `${this.reservationURL}/${this.allReservations}`;
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
 
    return  this.http.get<Reservation[]>(url, httpOptions);
  }


  getReservationsByUser():Observable<Reservation[]>{

    this.userDetails =  JSON.parse (localStorage.getItem('userinfo'));
    var url = `${this.reservationURL}/${this.userReservations}/${this.userDetails.id}`;
     
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
 
    return  this.http.get<Reservation[]>(url, httpOptions);
  }

  
  deleteReservation(reservation:Reservation):Observable<any>{
    const url = `${this.reservationURL}/${reservation.tableReservationId}`;
    console.log('URL: '+url);
    return this.http.delete<Reservation>(url,httpOptions);
     
   }


   addReservation(reservation:Reservation):Observable<Reservation>{
    const url = `${this.reservationURL}/add`;
    console.log('Add URL: '+url);
    return this.http.post<Reservation>(url, reservation,httpOptions);
     
   }
   
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
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

  login(formData){
    console.log(JSON.stringify(formData));

    var reqHeader = new HttpHeaders({  "authorization": "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA==",
    "content-type": "application/json;charset=UTF-8",
    "No-Auth": "True" ,
    "Access-Control-Allow-Origin": "http://localhost:4200/" 
    });
     return this.http.post('http://localhost:2233/login', formData, {headers:reqHeader});
  }


 


  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

   jsonToURI(jsonObj) {
    var output = '';
    var keys = Object.keys(jsonObj);
    keys.forEach(function(key) {
        output = output + key + '=' + jsonObj[key] + '&';
    })
    return output.slice(0, -1);
}


  


  
}
