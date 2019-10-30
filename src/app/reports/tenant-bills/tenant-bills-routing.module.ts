import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantBillsComponent } from './tenant-bills.component';


const routes: Routes = [
  {
    path: '',
    component: TenantBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantBillsRoutingModule { }
