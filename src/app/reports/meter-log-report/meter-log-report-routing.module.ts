import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeterLogReportComponent } from './meter-log-report.component';


const routes: Routes = [
  {
    path: '',
    component: MeterLogReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterLogReportRoutingModule { }
