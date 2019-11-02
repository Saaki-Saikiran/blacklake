import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEntryRoutingModule } from './user-entry-routing.module';
import { UserEntryComponent } from './user-entry.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UserEntryComponent],
  imports: [
    CommonModule,
    UserEntryRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class UserEntryModule { }
