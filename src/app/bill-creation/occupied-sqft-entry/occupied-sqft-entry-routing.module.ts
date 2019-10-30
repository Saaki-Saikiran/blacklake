import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccupiedSqftEntryComponent } from './occupied-sqft-entry.component';


const routes: Routes = [
  {
    path: '',
    component: OccupiedSqftEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupiedSqftEntryRoutingModule { }
