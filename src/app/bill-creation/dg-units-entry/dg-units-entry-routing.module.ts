import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DgUnitsEntryComponent } from './dg-units-entry.component';


const routes: Routes = [
  {
    path: '',
    component: DgUnitsEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DgUnitsEntryRoutingModule { }
