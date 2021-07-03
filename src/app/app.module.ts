import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListModule } from './components/category-list/category-list.module';
import { ExperienceOverviewModule } from './pages/experience-overview/experience-overview.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CategoryListModule,
    ExperienceOverviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
