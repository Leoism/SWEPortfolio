import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { NavBar } from './nav-bar.component';

@NgModule({
  declarations: [NavBar],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [NavBar],
})
export class NavBarModule {
  activeLink = '/';
}
