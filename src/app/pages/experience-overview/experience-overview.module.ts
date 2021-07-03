import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material';

import { CategoryListModule } from '../../components/category-list/category-list.module';

import { ExperienceOverview } from './experience-overview.component';

@NgModule({
  declarations: [ExperienceOverview],
  imports: [
    CategoryListModule,
    CommonModule,
    MatExpansionModule,
  ],
  exports: [ExperienceOverview],
})
export class ExperienceOverviewModule { }
