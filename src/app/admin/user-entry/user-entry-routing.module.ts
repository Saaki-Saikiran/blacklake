import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEntryComponent } from './user-entry.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [AddUserComponent],
  entryComponents: [AddUserComponent]
})
export class UserEntryRoutingModule { }
