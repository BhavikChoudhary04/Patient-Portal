import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicianRoutingModule } from './physician-routing.module';
import { PhysicianComponent } from './physician.component';


@NgModule({
  declarations: [PhysicianComponent],
  imports: [
    CommonModule,
    PhysicianRoutingModule
  ]
})
export class PhysicianModule { }
