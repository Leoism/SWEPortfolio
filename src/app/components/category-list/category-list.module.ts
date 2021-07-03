import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { CategoryList } from './category-list.component';

@NgModule({
  declarations: [CategoryList],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [CategoryList]
})
export class CategoryListModule { }
