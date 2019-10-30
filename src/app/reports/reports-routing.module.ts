import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'consumption-report',
        loadChildren: () => import('./consumption-report/consumption-report.module').then(module => module.ConsumptionReportModule)
      },
      {
        path: 'meter-log-report',
        loadChildren: () => import('./meter-log-report/meter-log-report.module').then(module => module.MeterLogReportModule)
      },
      {
        path: 'occupant-summary',
        loadChildren: () => import('./occupant-summary/occupant-summary.module').then(module => module.OccupantSummaryModule)
      },
      {
        path: 'tenant-bills',
        loadChildren: () => import('./tenant-bills/tenant-bills.module').then(module => module.TenantBillsModule)
      },
      {
        path: 'meter-readings-of-a-bill',
        loadChildren: () => import('./meter-readings-of-a-bill/meter-readings-of-a-bill.module').then(module => module.MeterReadingsOfABillModule)
      },
      {
        path: 'periodic-tenant-bills',
        loadChildren: () => import('./periodic-tenant-bills/periodic-tenant-bills.module').then(module => module.PeriodicTenantBillsModule)
      },
      {
        path: 'meter-occupancy',
        loadChildren: () => import('./meter-occupancy/meter-occupancy.module').then(module => module.MeterOccupancyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
