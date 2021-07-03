import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutOverview } from './about-overview.component';



@NgModule({
  declarations: [AboutOverview],
  imports: [
    CommonModule,
  ],
  exports: [AboutOverview],
})
export class AboutOverviewModule { }
