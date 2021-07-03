import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTable } from './work-table.component';



@NgModule({
  declarations: [WorkTable],
  imports: [
    CommonModule,
  ],
  exports: [WorkTable],
})
export class WorkTableModule { }
