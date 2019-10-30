import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeptBillComponent } from './dept-bill.component';


const routes: Routes = [
  {
    path: '',
    component: DeptBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptBillRoutingModule { }
