import { Component, Input } from '@angular/core';

interface NavigationItem {
  name: string,
  link: string,
}
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBar {
  @Input() navItems: NavigationItem[] = [];
  activeLink: string = '';
}
