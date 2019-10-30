import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterLogReportRoutingModule } from './meter-log-report-routing.module';
import { MeterLogReportComponent } from './meter-log-report.component';


@NgModule({
  declarations: [MeterLogReportComponent],
  imports: [
    CommonModule,
    MeterLogReportRoutingModule
  ]
})
export class MeterLogReportModule { }
