import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalComponentsRoutingModule } from './additional-components-routing.module';
import { AdditionalComponentsComponent } from './additional-components.component';


@NgModule({
  declarations: [AdditionalComponentsComponent],
  imports: [
    CommonModule,
    AdditionalComponentsRoutingModule
  ]
})
export class AdditionalComponentsModule { }
