import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AboutOverview } from './about-overview.component';


@NgModule({
  declarations: [AboutOverview],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [AboutOverview],
})
export class AboutOverviewModule { }
