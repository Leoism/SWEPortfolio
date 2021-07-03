import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { CategoryList } from './category-list.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CategoryList],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [CategoryList]
})
export class CategoryListModule { }
