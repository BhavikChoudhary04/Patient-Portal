import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicianComponent } from './physician.component';

const routes: Routes = [{ path: '', component: PhysicianComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
