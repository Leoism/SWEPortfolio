import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOverview } from './project-overview.component';



@NgModule({
  declarations: [ProjectOverview],
  imports: [
    CommonModule,
  ],
  exports: [ProjectOverview],
})
export class ProjectOverviewModule { }
