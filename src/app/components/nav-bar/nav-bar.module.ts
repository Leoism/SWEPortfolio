import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBar } from './nav-bar.component';
import { MatButtonModule, MatTabsModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [NavBar],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  exports: [NavBar],
})
export class NavBarModule {
  activeLink = '/';
}
