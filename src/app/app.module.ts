import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEntryComponent } from './admin/user-entry/user-entry.component';
import { MeterTypesComponent } from './admin/meter-types/meter-types.component';
import { DeptMetersComponent } from './meter-management/dept-meters/dept-meters.component';
import { MetersComponent } from './meter-management/meters/meters.component';
import { TenantsComponent } from './meter-management/tenants/tenants.component';
import { FloorsComponent } from './meter-management/floors/floors.component';
import { DgsComponent } from './meter-management/dgs/dgs.component';
import { MapMeterTenantsComponent } from './meter-management/map-meter-tenants/map-meter-tenants.component';
import { DeptBillComponent } from './bill-creation/dept-bill/dept-bill.component';
import { DgUnitsEntryComponent } from './bill-creation/dg-units-entry/dg-units-entry.component';
import { EditBillClosingReadingsComponent } from './bill-creation/edit-bill-closing-readings/edit-bill-closing-readings.component';
import { OccupiedSqftEntryComponent } from './bill-creation/occupied-sqft-entry/occupied-sqft-entry.component';
import { AdditionalComponentsComponent } from './bill-creation/additional-components/additional-components.component';
import { BillGenerationComponent } from './bill-creation/bill-generation/bill-generation.component';
import { ConsumptionReportComponent } from './reports/consumption-report/consumption-report.component';
import { MeterLogReportComponent } from './reports/meter-log-report/meter-log-report.component';
import { OccupantSummaryComponent } from './reports/occupant-summary/occupant-summary.component';
import { TenantBillsComponent } from './reports/tenant-bills/tenant-bills.component';
import { MeterReadingsOfABillComponent } from './reports/meter-readings-of-a-bill/meter-readings-of-a-bill.component';
import { PeriodicTenantBillsComponent } from './reports/periodic-tenant-bills/periodic-tenant-bills.component';
import { MeterOccupancyComponent } from './reports/meter-occupancy/meter-occupancy.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
