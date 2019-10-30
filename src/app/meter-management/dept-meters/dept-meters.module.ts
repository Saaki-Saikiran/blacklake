import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeptMetersRoutingModule } from './dept-meters-routing.module';
import { DeptMetersComponent } from './dept-meters.component';


@NgModule({
  declarations: [DeptMetersComponent],
  imports: [
    CommonModule,
    DeptMetersRoutingModule
  ]
})
export class DeptMetersModule { }
