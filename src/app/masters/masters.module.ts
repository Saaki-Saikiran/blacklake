import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterModelComponent } from './meter-model/meter-model.component';
import { GatewayComponent } from './gateway/gateway.component';
import { PanelComponent } from './panel/panel.component';
import { SourceMeterComponent } from './source-meter/source-meter.component';
import { MeterParametersComponent } from './meter-parameters/meter-parameters.component';

import { MastersRoutingModule } from './masters-routing.module';

import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [MeterModelComponent, GatewayComponent, PanelComponent, SourceMeterComponent, MeterParametersComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class MastersModule { }
