import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMeterTenantsRoutingModule } from './map-meter-tenants-routing.module';
import { MapMeterTenantsComponent } from './map-meter-tenants.component';


@NgModule({
  declarations: [MapMeterTenantsComponent],
  imports: [
    CommonModule,
    MapMeterTenantsRoutingModule
  ]
})
export class MapMeterTenantsModule { }
