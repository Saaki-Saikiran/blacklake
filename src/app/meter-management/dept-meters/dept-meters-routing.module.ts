import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeptMetersComponent } from './dept-meters.component';


const routes: Routes = [
  {
    path: '',
    component: DeptMetersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptMetersRoutingModule { }
