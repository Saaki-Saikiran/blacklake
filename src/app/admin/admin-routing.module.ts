import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-entry',
        loadChildren: () => import('./user-entry/user-entry.module').then(module => module.UserEntryModule)
      },
      {
        path: 'meter-types',
        loadChildren: () => import('./meter-types/meter-types.module').then(module => module.MeterTypesModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
