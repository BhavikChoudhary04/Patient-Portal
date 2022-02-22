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
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { ImmunizationComponent, ImmunizationDialogComponent } from './immunization/immunization.component';
import { VitalsComponent } from './vitals/vitals.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component'; 
import { DemographicsComponent } from './demographics/demographics.component';
import { MedicationAllergiesComponent } from './medication-allergies/medication-allergies.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemographicsDialogComponent } from './components/demographics-dialog/demographics-dialog.component';
import { MedicationsDialogComponent } from './components/medications-dialog/medications-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BillingComponent } from './billing/billing.component';
import { MatTableModule} from '@angular/material/table';
import { MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [PatientComponent, DashboardComponent, ScheduleAppointmentComponent,ImmunizationDialogComponent, PhysicianBookAppointmentDialog, ImmunizationComponent, VitalsComponent, AppointmentHistoryComponent, DemographicsComponent, MedicationAllergiesComponent, DemographicsDialogComponent, MedicationsDialogComponent, ProfileDetailsComponent, BillingComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
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
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [ScheduleAppointmentComponent, DashboardComponent, ImmunizationComponent, ImmunizationDialogComponent, VitalsComponent, BillingComponent]
})
export class PatientModule { }
