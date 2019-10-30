import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DgUnitsEntryRoutingModule } from './dg-units-entry-routing.module';
import { DgUnitsEntryComponent } from './dg-units-entry.component';


@NgModule({
  declarations: [DgUnitsEntryComponent],
  imports: [
    CommonModule,
    DgUnitsEntryRoutingModule
  ]
})
export class DgUnitsEntryModule { }
