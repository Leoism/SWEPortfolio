import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBar } from './nav-bar.component';

@NgModule({
  declarations: [NavBar],
  imports: [
    CommonModule,
  ],
  exports: [NavBar],
})
export class NavBarModule { }
