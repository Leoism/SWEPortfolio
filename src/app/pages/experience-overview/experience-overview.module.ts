import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListModule } from '../../components/category-list/category-list.module';

import { ExperienceOverview } from './experience-overview.component';



@NgModule({
  declarations: [ExperienceOverview],
  imports: [
    CategoryListModule,
    CommonModule,
  ],
  exports: [ExperienceOverview],
})
export class ExperienceOverviewModule { }
