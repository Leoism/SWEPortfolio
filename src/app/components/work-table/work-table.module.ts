import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { WorkTable } from './work-table.component';

@NgModule({
  declarations: [WorkTable],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatTableModule,
  ],
  exports: [WorkTable],
})
export class WorkTableModule { }
