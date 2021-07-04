import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemsPage } from './add-items-page.component';



@NgModule({
  declarations: [AddItemsPage],
  imports: [
    CommonModule
  ],
  exports: [AddItemsPage],
})
export class AddItemsPageModule { }
