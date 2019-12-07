import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeterModelComponent} from './meter-model/meter-model.component';
import {GatewayComponent} from './gateway/gateway.component';
import{SourceMeterComponent} from  './source-meter/source-meter.component';
import {PanelComponent} from './panel/panel.component';
import {MeterParametersComponent} from './meter-parameters/meter-parameters.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'meter-model',
        component: MeterModelComponent
      },
      {
        path: 'gateway',
        component: GatewayComponent
      },
      {
        path: 'source-meter',
        component: SourceMeterComponent
      },
      {
        path: 'panel',
        component: PanelComponent
      },
      {
        path: 'meter-parameters',
        component: MeterParametersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
