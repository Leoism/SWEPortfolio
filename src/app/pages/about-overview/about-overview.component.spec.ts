import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutOverview } from './about-overview.component';

describe('AboutOverview', () => {
  let component: AboutOverview;
  let fixture: ComponentFixture<AboutOverview>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutOverview ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
