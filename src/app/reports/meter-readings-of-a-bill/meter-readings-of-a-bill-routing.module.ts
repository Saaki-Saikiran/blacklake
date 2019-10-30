import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeterReadingsOfABillComponent } from './meter-readings-of-a-bill.component';


const routes: Routes = [
  {
    path: '',
    component: MeterReadingsOfABillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterReadingsOfABillRoutingModule { }
