import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftsContainerComponent } from './manage-shifts-container.component';

describe('ManageShiftsContainerComponent', () => {
  let component: ManageShiftsContainerComponent;
  let fixture: ComponentFixture<ManageShiftsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShiftsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShiftsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
