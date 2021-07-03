import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceOverview } from './experience-overview.component';

describe('ExperienceOverview', () => {
  let component: ExperienceOverview;
  let fixture: ComponentFixture<ExperienceOverview>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceOverview ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
