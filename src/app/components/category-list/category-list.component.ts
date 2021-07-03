import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryList {
  @Input() title: string = 'Category';
  @Input() items: string[] = [];
}
