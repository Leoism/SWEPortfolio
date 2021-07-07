import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkTable } from './common-table.component';


describe('WorkTable', () => {
  let component: WorkTable;
  let fixture: ComponentFixture<WorkTable>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTable]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
