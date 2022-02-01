import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) }, { path: 'physician', loadChildren: () => import('./physician/physician.module').then(m => m.PhysicianModule) }, { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'header', loadChildren: () => import('./header/header.module').then(m => m.HeaderModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
