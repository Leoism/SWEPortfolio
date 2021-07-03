import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

interface CategoryItem {
  name: string,
  tooltip?: string,
}
@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryList {
  @Input() title: string = 'Category';
  @Input() items: CategoryItem[] = [];

  position = new FormControl('right' as TooltipPosition);
}
