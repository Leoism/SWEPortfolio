import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutOverview } from './pages/about-overview/about-overview.component';
import { ExperienceOverview } from './pages/experience-overview/experience-overview.component';
import { ProjectOverview } from './pages/project-overview/project-overview.component';

// these get rendered in place of router-outlet
const routes: Routes = [
  {path: '', component: ExperienceOverview},
  {path: 'projects', component: ProjectOverview},
  {path: 'about', component: AboutOverview},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
