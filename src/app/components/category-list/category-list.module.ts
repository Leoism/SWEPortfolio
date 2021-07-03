import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryList } from './category-list.component';


@NgModule({
  declarations: [CategoryList],
  imports: [
    CommonModule,
  ],
  exports: [CategoryList]
})
export class CategoryListModule { }
