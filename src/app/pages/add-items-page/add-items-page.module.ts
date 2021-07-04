import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { AddItemsPage } from './add-items-page.component';


@NgModule({
  declarations: [AddItemsPage],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [AddItemsPage],
})
export class AddItemsPageModule { }
