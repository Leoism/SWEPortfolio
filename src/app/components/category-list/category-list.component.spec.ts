import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryList } from './category-list.component';

describe('CategoryList', () => {
  let component: CategoryList;
  let fixture: ComponentFixture<CategoryList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
