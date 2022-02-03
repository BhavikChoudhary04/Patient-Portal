import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'reset', component: ResetComponent },
      { path: 'register', component: RegisterComponent }]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
