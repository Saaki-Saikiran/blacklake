import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionReportRoutingModule } from './consumption-report-routing.module';
import { ConsumptionReportComponent } from './consumption-report.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConsumptionReportComponent],
  imports: [
    CommonModule,
    ConsumptionReportRoutingModule,
    SharedModule,
    DataTablesModule,
    AmazingTimePickerModule,
    ColorPickerModule,
    NgbDatepickerModule
  ]
})
export class ConsumptionReportModule { }
