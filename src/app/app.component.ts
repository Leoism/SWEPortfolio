import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio';
  readonly navButtons = [
    { name: 'Home', link: '/' },
    { name: 'Projects', link: '/projects' },
    { name: 'About', link: '/about' },
    { name: 'Portal', link: '/portal' },
  ];
}
