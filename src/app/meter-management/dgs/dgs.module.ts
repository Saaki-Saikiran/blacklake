import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DgsRoutingModule } from './dgs-routing.module';
import { DgsComponent } from './dgs.component';


@NgModule({
  declarations: [DgsComponent],
  imports: [
    CommonModule,
    DgsRoutingModule
  ]
})
export class DgsModule { }
