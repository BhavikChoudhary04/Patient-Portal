import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ]
  },
  {
    path: 'physician',
    loadChildren: () => import('./physician/physician.module').then(m => m.PhysicianModule),
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ]
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then(m => m.HeaderModule)
  },
    {
      path: '**', 
      redirectTo: 'auth/login'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
