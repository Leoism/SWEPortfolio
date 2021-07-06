import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveItems } from './remove-items.component';


describe('RemoveItems', () => {
  let component: RemoveItems;
  let fixture: ComponentFixture<RemoveItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveItems ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
