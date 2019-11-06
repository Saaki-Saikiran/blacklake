import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeptMetersComponent } from './dept-meters/dept-meters.component';
import { MapMeterTenantsComponent } from './map-meter-tenants/map-meter-tenants.component';
import { DgsComponent } from './dgs/dgs.component';
import { FloorsComponent } from './floors/floors.component';
import { TenantsComponent } from './tenants/tenants.component';
import { MetersComponent } from './meters/meters.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dept-meters',
        component: DeptMetersComponent
      },
      {
        path: 'meters',
        component: MetersComponent
      },
      {
        path: 'tenants',
        component: TenantsComponent
      },
      {
        path: 'floors',
        component: FloorsComponent
      },
      {
        path: 'dgs',
        component: DgsComponent
      },
      {
        path: 'map-meter-tenants',
        component: MapMeterTenantsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterManagementRoutingModule { }
