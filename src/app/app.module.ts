import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationService } from './service/reservation.service';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';
import { HeadderComponent } from './headder/headder.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { DemoMaterialModule } from './material/material.module';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    ReservationsComponent,
    ReservationItemComponent,
    HeadderComponent,
    AddReservationComponent
  ],
  imports: [
    BrowserModule,
    DemoMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
    
  ],
  providers: [
    FormsModule
/*     ReservationService, {
    provide: HTTP_INTERCEPTORS,
    '',
    multi: true
  } */
],
  bootstrap: [AppComponent]
})
export class AppModule { }
