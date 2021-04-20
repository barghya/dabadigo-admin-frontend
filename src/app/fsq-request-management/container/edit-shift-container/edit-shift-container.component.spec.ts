import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftContainerComponent } from './edit-shift-container.component';

describe('EditShiftContainerComponent', () => {
  let component: EditShiftContainerComponent;
  let fixture: ComponentFixture<EditShiftContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShiftContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShiftContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
