import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantBillsRoutingModule } from './tenant-bills-routing.module';
import { TenantBillsComponent } from './tenant-bills.component';


@NgModule({
  declarations: [TenantBillsComponent],
  imports: [
    CommonModule,
    TenantBillsRoutingModule
  ]
})
export class TenantBillsModule { }
