import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutOverview } from './pages/about-overview/about-overview.component';
import { ExperienceOverview } from './pages/experience-overview/experience-overview.component';
import { ProjectOverview } from './pages/project-overview/project-overview.component';
import { RemoveItems } from './pages/remove-items/remove-items.component';


// these get rendered in place of router-outlet
const routes: Routes = [
  {path: '', component: ExperienceOverview},
  {path: 'projects', component: ProjectOverview},
  {path: 'about', component: AboutOverview},
  {path: 'portal', component: RemoveItems},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
