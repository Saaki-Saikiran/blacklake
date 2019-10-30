import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodicTenantBillsComponent } from './periodic-tenant-bills.component';


const routes: Routes = [
  {
    path: '',
    component: PeriodicTenantBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicTenantBillsRoutingModule { }
