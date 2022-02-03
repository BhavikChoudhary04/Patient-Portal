import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: `login`,
        pathMatch: 'full'
      },
      {
        path: `login`,
        component: LoginComponent,
      },
      { path: 'reset/:data', component: ResetComponent },
      { path: 'register', component: RegisterComponent }]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
