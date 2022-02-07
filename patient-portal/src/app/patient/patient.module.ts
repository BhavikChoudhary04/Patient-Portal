import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule} from '@angular/material/select/';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [PatientComponent, ScheduleAppointmentComponent],
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
    MatInputModule
  ],
  exports: [ScheduleAppointmentComponent]
})
export class PatientModule { }
