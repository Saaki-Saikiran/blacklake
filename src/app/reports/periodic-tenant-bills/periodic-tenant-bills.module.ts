import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicTenantBillsRoutingModule } from './periodic-tenant-bills-routing.module';
import { PeriodicTenantBillsComponent } from './periodic-tenant-bills.component';


@NgModule({
  declarations: [PeriodicTenantBillsComponent],
  imports: [
    CommonModule,
    PeriodicTenantBillsRoutingModule
  ]
})
export class PeriodicTenantBillsModule { }
