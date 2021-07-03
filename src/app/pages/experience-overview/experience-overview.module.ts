import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceOverview } from './experience-overview.component';

import { CategoryListModule } from '../../components/category-list/category-list.module';

@NgModule({
  declarations: [ExperienceOverview],
  imports: [
    CategoryListModule,
    CommonModule,
  ],
  exports: [ExperienceOverview],
})
export class ExperienceOverviewModule { }
