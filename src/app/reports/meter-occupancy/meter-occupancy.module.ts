import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterOccupancyRoutingModule } from './meter-occupancy-routing.module';
import { MeterOccupancyComponent } from './meter-occupancy.component';


@NgModule({
  declarations: [MeterOccupancyComponent],
  imports: [
    CommonModule,
    MeterOccupancyRoutingModule
  ]
})
export class MeterOccupancyModule { }
