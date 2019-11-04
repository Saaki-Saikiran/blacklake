import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [AddRoleComponent],
  entryComponents: [AddRoleComponent]
})

export class RolesRoutingModule { }
