import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterLogReportRoutingModule } from './meter-log-report-routing.module';
import { MeterLogReportComponent } from './meter-log-report.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MeterLogReportComponent],
  imports: [
    CommonModule,
    MeterLogReportRoutingModule,
    SharedModule,
    DataTablesModule,
    AmazingTimePickerModule,
    ColorPickerModule,
    NgbDatepickerModule
  ]
 
})
export class MeterLogReportModule { }
