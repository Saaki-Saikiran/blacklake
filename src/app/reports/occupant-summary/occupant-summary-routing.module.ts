import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccupantSummaryComponent } from './occupant-summary.component';


const routes: Routes = [
  {
    path: '',
    component: OccupantSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupantSummaryRoutingModule { }
