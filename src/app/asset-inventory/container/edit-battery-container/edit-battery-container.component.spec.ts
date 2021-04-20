import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatteryContainerComponent } from './edit-battery-container.component';

describe('EditBatteryContainerComponent', () => {
  let component: EditBatteryContainerComponent;
  let fixture: ComponentFixture<EditBatteryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatteryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatteryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
