import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';


@NgModule({
  declarations: [FloorsComponent],
  imports: [
    CommonModule,
    FloorsRoutingModule
  ]
})
export class FloorsModule { }
