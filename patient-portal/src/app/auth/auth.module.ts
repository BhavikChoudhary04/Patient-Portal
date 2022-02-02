import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AuthComponent } from './auth.component';
import { ResetComponent } from './reset/reset.component';



@NgModule({
  declarations: [AuthComponent, ResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class AuthModule { }
