import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicianGuard } from '../shared/guards/physician.guard';
import { PhysicianComponent } from './physician.component';

const routes: Routes = [{ path: '', 
canActivateChild: [ PhysicianGuard ],
component: PhysicianComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
