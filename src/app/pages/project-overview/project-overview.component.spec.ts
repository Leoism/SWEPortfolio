import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectOverview } from './project-overview.component';

describe('ProjectOverview', () => {
  let component: ProjectOverview;
  let fixture: ComponentFixture<ProjectOverview>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOverview ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
