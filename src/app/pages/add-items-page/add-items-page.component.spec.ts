import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddItemsPageComponent } from './add-items-page.component';

describe('AddItemsPageComponent', () => {
  let component: AddItemsPageComponent;
  let fixture: ComponentFixture<AddItemsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
