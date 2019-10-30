import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeterTypesComponent } from './meter-types.component';

const routes: Routes = [
  {
    path: '',
    component: MeterTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterTypesRoutingModule { }
