import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryList {
  @Input() title: string = 'Category';
  @Input() items: string[] = [];
}
