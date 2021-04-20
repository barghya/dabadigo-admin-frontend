import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdjustmentContainerComponent } from './edit-adjustment-container.component';

describe('EditAdjustmentContainerComponent', () => {
  let component: EditAdjustmentContainerComponent;
  let fixture: ComponentFixture<EditAdjustmentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdjustmentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdjustmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
