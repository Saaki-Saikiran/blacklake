import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapMeterTenantsComponent } from './map-meter-tenants.component';


const routes: Routes = [
  {
    path: '',
    component: MapMeterTenantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapMeterTenantsRoutingModule { }
