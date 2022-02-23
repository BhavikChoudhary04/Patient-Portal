import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGuard } from '../shared/guards/patient.guard';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { MedicationAllergiesComponent } from './medication-allergies/medication-allergies.component';
import { PatientComponent } from './patient.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { VitalsComponent } from './vitals/vitals.component';
import { BillingComponent } from './billing/billing.component';

// const routes: Routes = [{ path: '', component: PatientComponent }];

//patient/dashboard
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
    {
      path: 'dashboard',
      component: PatientComponent,
      canActivateChild: [PatientGuard],
    children: [
      {
        path:'my-profile',
        component: ProfileDetailsComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'schedule-appointment',
        component: ScheduleAppointmentComponent
      },
      {
        path: 'appointment-history',
        component: AppointmentHistoryComponent,
      },
      {
        path: 'demographics',
        component: DemographicsComponent
      },
      {
        path: 'medications-allergies',
        component: MedicationAllergiesComponent
      },
      {
        path: 'immunization',
        component: ImmunizationComponent
      },
      {
        path: 'vitals',
        component: VitalsComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
