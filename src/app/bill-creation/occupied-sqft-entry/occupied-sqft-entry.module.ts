import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupiedSqftEntryRoutingModule } from './occupied-sqft-entry-routing.module';
import { OccupiedSqftEntryComponent } from './occupied-sqft-entry.component';


@NgModule({
  declarations: [OccupiedSqftEntryComponent],
  imports: [
    CommonModule,
    OccupiedSqftEntryRoutingModule
  ]
})
export class OccupiedSqftEntryModule { }
