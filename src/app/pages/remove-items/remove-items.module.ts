import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { WorkTableModule } from 'src/app/components/work-table/work-table.module';
import { AddItemsPageModule } from '../add-items-page/add-items-page.module';
import { RemoveItems } from './remove-items.component';

@NgModule({
  declarations: [RemoveItems],
  imports: [
    AddItemsPageModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    WorkTableModule,
  ],
  exports: [RemoveItems],
})
export class RemoveItemsModule { }
