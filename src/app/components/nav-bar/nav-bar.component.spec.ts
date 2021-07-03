import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBar } from './nav-bar.component';

describe('NavBar', () => {
  let component: NavBar;
  let fixture: ComponentFixture<NavBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
