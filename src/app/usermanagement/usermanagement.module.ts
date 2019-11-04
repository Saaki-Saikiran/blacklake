import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { RolesComponent } from './roles/roles.component';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleComponent } from './roles/add-role/add-role.component';


@NgModule({
  declarations: [RolesComponent, AddRoleComponent],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ],
  entryComponents: [AddRoleComponent]
})
export class UsermanagementModule { }
