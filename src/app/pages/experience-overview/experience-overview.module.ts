import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatExpansionModule } from '@angular/material';

import { CategoryListModule } from '../../components/category-list/category-list.module';
import { WorkTableModule } from '../../components/work-table/work-table.module';

import { ExperienceOverview } from './experience-overview.component';

@NgModule({
  declarations: [ExperienceOverview],
  imports: [
    CategoryListModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    WorkTableModule,
  ],
  exports: [ExperienceOverview],
})
export class ExperienceOverviewModule { }
