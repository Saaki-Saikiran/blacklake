import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { MeterTypesComponent } from './meter-types/meter-types.component';
import { AddUserComponent } from './user-entry/add-user/add-user.component';


@NgModule({
  declarations: [UserEntryComponent, MeterTypesComponent, AddUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    AdminRoutingModule
  ],
  entryComponents: [AddUserComponent]
})
export class AdminModule { }
