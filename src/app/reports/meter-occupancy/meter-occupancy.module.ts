import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterOccupancyRoutingModule } from './meter-occupancy-routing.module';
import { MeterOccupancyComponent } from './meter-occupancy.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MeterOccupancyComponent],
  imports: [
    CommonModule,
    MeterOccupancyRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class MeterOccupancyModule { }
