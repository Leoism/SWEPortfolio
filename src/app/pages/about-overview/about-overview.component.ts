import { Component } from '@angular/core';

interface AboutEntry {
  title: string; // title of the entry
  value: string; // text related to the title
}

interface AboutUrl {
  url: string; // url to redirect to 
  image: string; // image url to display
  alt?: string; // alt text for the image
}

@Component({
  selector: 'about-overview',
  templateUrl: './about-overview.component.html',
  styleUrls: ['./about-overview.component.scss']
})
export class AboutOverview {
  aboutEntries: AboutEntry[] = [];
  profileImage: string = '';
  aboutUrls: AboutUrl[] = [];
}
