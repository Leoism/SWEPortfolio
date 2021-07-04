import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { ExperienceOverviewModule } from './pages/experience-overview/experience-overview.module';
import { ProjectOverviewModule } from './pages/project-overview/project-overview.module';
import { AboutOverviewModule } from './pages/about-overview/about-overview.module';
import { AddItemsPageModule } from './pages/add-items-page/add-items-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AboutOverviewModule,
    AddItemsPageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ExperienceOverviewModule,
    NavBarModule,
    ProjectOverviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
