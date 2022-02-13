import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule} from '@angular/material/select/';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { PhysicianBookAppointmentDialog, ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from '../navigation/sidenav/sidenav.component';
import { HeaderComponent } from '../navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { ImmunizationComponent } from './immunization/immunization.component';
import { VitalsComponent } from './vitals/vitals.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component'; 
import { DemographicsComponent } from './demographics/demographics.component';
import { MedicationAllergiesComponent } from './medication-allergies/medication-allergies.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [PatientComponent, DashboardComponent, SidenavComponent, HeaderComponent, ScheduleAppointmentComponent, PhysicianBookAppointmentDialog, ImmunizationComponent, VitalsComponent, AppointmentHistoryComponent, DemographicsComponent, MedicationAllergiesComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule
  ],
  exports: [ScheduleAppointmentComponent, SidenavComponent , HeaderComponent, DashboardComponent, ImmunizationComponent, VitalsComponent]
})
export class PatientModule { }
