import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dept-bill',
        loadChildren: () => import('./dept-bill/dept-bill.module').then(module => module.DeptBillModule)
      },
      {
        path: 'dg-units-entry',
        loadChildren: () => import('./dg-units-entry/dg-units-entry.module').then(module => module.DgUnitsEntryModule)
      },
      {
        path: 'edit-bill-closing-readings',
        loadChildren: () => import('./edit-bill-closing-readings/edit-bill-closing-readings.module').then(module => module.EditBillClosingReadingsModule)
      },
      {
        path: 'occupied-sqft-entry',
        loadChildren: () => import('./occupied-sqft-entry/occupied-sqft-entry.module').then(module => module.OccupiedSqftEntryModule)
      },
      {
        path: 'additional-components',
        loadChildren: () => import('./additional-components/additional-components.module').then(module => module.AdditionalComponentsModule)
      },
      {
        path: 'bill-generation',
        loadChildren: () => import('./bill-generation/bill-generation.module').then(module => module.BillGenerationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillCreationRoutingModule { }
