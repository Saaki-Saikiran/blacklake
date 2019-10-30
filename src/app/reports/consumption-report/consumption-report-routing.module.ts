import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumptionReportComponent } from './consumption-report.component';


const routes: Routes = [
  {
    path: '',
    component: ConsumptionReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumptionReportRoutingModule { }
