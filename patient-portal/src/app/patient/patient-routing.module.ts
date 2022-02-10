import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient.component';

// const routes: Routes = [{ path: '', component: PatientComponent }];

//patient/dashboard
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'appointment-history',
        component: AppointmentHistoryComponent,
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
