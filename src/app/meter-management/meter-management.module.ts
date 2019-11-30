import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterManagementRoutingModule } from './meter-management-routing.module';
import { DeptMetersComponent } from './dept-meters/dept-meters.component';
import { DgsComponent } from './dgs/dgs.component';
import { FloorsComponent } from './floors/floors.component';
import { TenantsComponent } from './tenants/tenants.component';
import { MetersComponent } from './meters/meters.component';
import { MapMeterTenantsComponent } from './map-meter-tenants/map-meter-tenants.component';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DeptMetersComponent, DgsComponent, FloorsComponent, TenantsComponent, MetersComponent, MapMeterTenantsComponent],
  imports: [
    CommonModule,
    MeterManagementRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ],
  entryComponents: []

})
export class MeterManagementModule { }
