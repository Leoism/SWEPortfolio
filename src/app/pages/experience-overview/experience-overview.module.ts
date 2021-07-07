import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryListModule } from '../../components/category-list/category-list.module';
import { CommonTableModule } from '../../components/common-table/common-table.module';
import { ExperienceOverview } from './experience-overview.component';

@NgModule({
  declarations: [ExperienceOverview],
  imports: [
    CategoryListModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    CommonTableModule,
  ],
  exports: [ExperienceOverview],
})
export class ExperienceOverviewModule { }
