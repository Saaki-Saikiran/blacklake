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
import { AddDeptMetersComponent } from './dept-meters/add-dept-meters/add-dept-meters.component';
import { AddDgsComponent } from './dgs/add-dgs/add-dgs.component';
import { AddFloorsComponent } from './floors/add-floors/add-floors.component';
import { AddTenantsComponent } from './tenants/add-tenants/add-tenants.component';
import { AddMeterComponent } from './meters/add-meter/add-meter.component';
import { AddMapMeterTenantsComponent } from './map-meter-tenants/add-map-meter-tenants/add-map-meter-tenants.component';


@NgModule({
  declarations: [DeptMetersComponent, DgsComponent, FloorsComponent, TenantsComponent, MetersComponent, MapMeterTenantsComponent, AddDeptMetersComponent, AddDgsComponent, AddFloorsComponent, AddTenantsComponent, AddMeterComponent, AddMapMeterTenantsComponent],
  imports: [
    CommonModule,
    MeterManagementRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ],
  entryComponents: [AddDeptMetersComponent, AddDgsComponent, AddFloorsComponent, AddTenantsComponent, AddMeterComponent, AddMapMeterTenantsComponent]

})
export class MeterManagementModule { }
