import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExperienceOverviewModule } from './pages/experience-overview/experience-overview.module';
import { NavBarModule } from './components/nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ExperienceOverviewModule,
    NavBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
