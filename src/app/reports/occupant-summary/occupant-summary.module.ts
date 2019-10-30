import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupantSummaryRoutingModule } from './occupant-summary-routing.module';
import { OccupantSummaryComponent } from './occupant-summary.component';


@NgModule({
  declarations: [OccupantSummaryComponent],
  imports: [
    CommonModule,
    OccupantSummaryRoutingModule
  ]
})
export class OccupantSummaryModule { }
