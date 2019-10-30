import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBillClosingReadingsComponent } from './edit-bill-closing-readings.component';


const routes: Routes = [
  {
    path: '',
    component: EditBillClosingReadingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBillClosingReadingsRoutingModule { }
