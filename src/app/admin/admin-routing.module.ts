import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { MeterTypesComponent } from './meter-types/meter-types.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-entry',
        component: UserEntryComponent
      },
      {
        path: 'meter-types',
        component: MeterTypesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
