import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEntryRoutingModule } from './user-entry-routing.module';
import { UserEntryComponent } from './user-entry.component';


@NgModule({
  declarations: [UserEntryComponent],
  imports: [
    CommonModule,
    UserEntryRoutingModule
  ]
})
export class UserEntryModule { }
