import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { ImmunizationComponent } from './patient/immunization/immunization.component';
import { VitalsComponent } from './patient/vitals/vitals.component';
import { PatientGuard } from './shared/guards/patient.guard';
import { PhysicianGuard } from './shared/guards/physician.guard';
import { AdminGuard } from './shared/guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'physician',
    loadChildren: () => import('./physician/physician.module').then(m => m.PhysicianModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [ AuthGuard ]
    //canActivateChild: [ AuthGuard ]

  },
  {
    path: 'immunization',
    component: ImmunizationComponent
  },
  {
    path: 'vitals',
    component: VitalsComponent
  }
  // {
  //   path: '**', 
  //   redirectTo: 'auth/login',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
