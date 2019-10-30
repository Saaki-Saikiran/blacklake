import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptBillRoutingModule } from './dept-bill-routing.module';
import { DeptBillComponent } from './dept-bill.component';


@NgModule({
  declarations: [DeptBillComponent],
  imports: [
    CommonModule,
    DeptBillRoutingModule
  ]
})
export class DeptBillModule { }
