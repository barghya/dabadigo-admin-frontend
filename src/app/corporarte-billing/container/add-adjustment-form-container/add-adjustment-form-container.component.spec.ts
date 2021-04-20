import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjustmentFormContainerComponent } from './add-adjustment-form-container.component';

describe('AddAdjustmentFormContainerComponent', () => {
  let component: AddAdjustmentFormContainerComponent;
  let fixture: ComponentFixture<AddAdjustmentFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdjustmentFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdjustmentFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
