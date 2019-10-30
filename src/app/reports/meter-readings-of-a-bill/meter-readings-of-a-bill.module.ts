import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterReadingsOfABillRoutingModule } from './meter-readings-of-a-bill-routing.module';
import { MeterReadingsOfABillComponent } from './meter-readings-of-a-bill.component';


@NgModule({
  declarations: [MeterReadingsOfABillComponent],
  imports: [
    CommonModule,
    MeterReadingsOfABillRoutingModule
  ]
})
export class MeterReadingsOfABillModule { }
