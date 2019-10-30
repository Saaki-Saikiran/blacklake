import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBillClosingReadingsRoutingModule } from './edit-bill-closing-readings-routing.module';
import { EditBillClosingReadingsComponent } from './edit-bill-closing-readings.component';


@NgModule({
  declarations: [EditBillClosingReadingsComponent],
  imports: [
    CommonModule,
    EditBillClosingReadingsRoutingModule
  ]
})
export class EditBillClosingReadingsModule { }
