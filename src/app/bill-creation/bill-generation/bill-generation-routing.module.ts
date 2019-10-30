import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillGenerationComponent } from './bill-generation.component';


const routes: Routes = [
  {
    path: '',
    component: BillGenerationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillGenerationRoutingModule { }
