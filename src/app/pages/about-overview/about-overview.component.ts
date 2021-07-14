import { Component, OnInit } from '@angular/core';
import { AboutEntry, AboutUrl, DatabaseCommunicator } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'about-overview',
  templateUrl: './about-overview.component.html',
  styleUrls: ['./about-overview.component.scss']
})
export class AboutOverview implements OnInit {
  aboutEntries: AboutEntry[] = [];
  profileImage: string = '';
  aboutUrls: AboutUrl[] = [];

  ngOnInit() {
    DatabaseCommunicator.getAboutInformation().then((info) => {
      this.aboutEntries = info.entries;
      this.aboutUrls = info.urls;
      this.profileImage = info.profile.value;
    })
  }
}
