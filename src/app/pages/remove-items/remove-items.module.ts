import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonTableModule } from '../../components/common-table/common-table.module';
import { AddItemsPageModule } from '../add-items-page/add-items-page.module';
import { RemoveItems } from './remove-items.component';

@NgModule({
  declarations: [RemoveItems],
  imports: [
    AddItemsPageModule,
    CommonModule,
    CommonTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  exports: [RemoveItems],
})
export class RemoveItemsModule { }
