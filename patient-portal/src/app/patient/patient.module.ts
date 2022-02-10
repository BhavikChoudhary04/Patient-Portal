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
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component'; 
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PatientComponent, DashboardComponent, SidenavComponent, HeaderComponent, ScheduleAppointmentComponent, PhysicianBookAppointmentDialog, AppointmentHistoryComponent],
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
    MatButtonModule
  ],
  exports: [ScheduleAppointmentComponent, SidenavComponent , HeaderComponent, DashboardComponent]
})
export class PatientModule { }
