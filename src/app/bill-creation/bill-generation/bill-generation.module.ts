import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillGenerationRoutingModule } from './bill-generation-routing.module';
import { BillGenerationComponent } from './bill-generation.component';


@NgModule({
  declarations: [BillGenerationComponent],
  imports: [
    CommonModule,
    BillGenerationRoutingModule
  ]
})
export class BillGenerationModule { }
