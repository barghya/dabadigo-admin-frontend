import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjustmentFormComponent } from './add-adjustment-form.component';

describe('AddAdjustmentFormComponent', () => {
  let component: AddAdjustmentFormComponent;
  let fixture: ComponentFixture<AddAdjustmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdjustmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdjustmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
