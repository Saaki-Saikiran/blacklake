import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeterOccupancyComponent } from './meter-occupancy.component';


const routes: Routes = [
  {
    path: '',
    component: MeterOccupancyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterOccupancyRoutingModule { }
