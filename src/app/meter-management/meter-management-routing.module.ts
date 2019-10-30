import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dept-meters',
        loadChildren: () => import('./dept-meters/dept-meters.module').then(module => module.DeptMetersModule)
      },
      {
        path: 'meters',
        loadChildren: () => import('./meters/meters.module').then(module => module.MetersModule)
      },
      {
        path: 'tenants',
        loadChildren: () => import('./tenants/tenants.module').then(module => module.TenantsModule)
      },
      {
        path: 'floors',
        loadChildren: () => import('./floors/floors.module').then(module => module.FloorsModule)
      },
      {
        path: 'dgs',
        loadChildren: () => import('./dgs/dgs.module').then(module => module.DgsModule)
      },
      {
        path: 'map-meter-tenants',
        loadChildren: () => import('./map-meter-tenants/map-meter-tenants.module').then(module => module.MapMeterTenantsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterManagementRoutingModule { }
