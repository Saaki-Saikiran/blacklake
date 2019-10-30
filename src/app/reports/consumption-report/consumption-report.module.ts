import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionReportRoutingModule } from './consumption-report-routing.module';
import { ConsumptionReportComponent } from './consumption-report.component';


@NgModule({
  declarations: [ConsumptionReportComponent],
  imports: [
    CommonModule,
    ConsumptionReportRoutingModule
  ]
})
export class ConsumptionReportModule { }
