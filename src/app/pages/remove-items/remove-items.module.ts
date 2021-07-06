import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddItemsPageModule } from '../add-items-page/add-items-page.module';
import { RemoveItems } from './remove-items.component';



@NgModule({
  declarations: [RemoveItems],
  imports: [
    AddItemsPageModule,
    CommonModule,
  ],
  exports: [RemoveItems],
})
export class RemoveItemsModule { }
