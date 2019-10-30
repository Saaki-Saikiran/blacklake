import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloorsComponent } from './floors.component';


const routes: Routes = [
  {
    path: '',
    component: FloorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorsRoutingModule { }
