import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonTableModule } from '../../components/common-table/common-table.module';
import { ProjectOverview } from './project-overview.component';



@NgModule({
  declarations: [ProjectOverview],
  imports: [
    CommonModule,
    CommonTableModule,
  ],
  exports: [ProjectOverview],
})
export class ProjectOverviewModule { }
