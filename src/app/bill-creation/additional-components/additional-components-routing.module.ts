import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionalComponentsComponent } from './additional-components.component';


const routes: Routes = [
  {
    path: '',
    component: AdditionalComponentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalComponentsRoutingModule { }
