import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { UniqueFilter } from './unique-pipe';
import { OrderByPipe } from './orderby-pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FilterPipe,
    UniqueFilter,
    OrderByPipe
  ],
  declarations: [
    FilterPipe,
    UniqueFilter,
    OrderByPipe
  ]
})

export class FilterPipeModule { }
