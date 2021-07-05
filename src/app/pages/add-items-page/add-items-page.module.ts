import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';
import { AddItemsPage } from './add-items-page.component';



@NgModule({
  declarations: [AddItemsPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
  ],
  exports: [AddItemsPage],
})
export class AddItemsPageModule { }
