import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from '../navigation/sidenav/sidenav.component';
import { HeaderComponent } from '../navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PatientComponent, DashboardComponent, SidenavComponent, HeaderComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  exports : [SidenavComponent , HeaderComponent, DashboardComponent]
})
export class PatientModule { }
