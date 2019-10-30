import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterTypesRoutingModule } from './meter-types-routing.module';
import { MeterTypesComponent } from './meter-types.component';


@NgModule({
  declarations: [MeterTypesComponent],
  imports: [
    CommonModule,
    MeterTypesRoutingModule
  ]
})
export class MeterTypesModule { }
