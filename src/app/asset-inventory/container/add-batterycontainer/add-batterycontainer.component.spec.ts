import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatterycontainerComponent } from './add-batterycontainer.component';

describe('AddBatterycontainerComponent', () => {
  let component: AddBatterycontainerComponent;
  let fixture: ComponentFixture<AddBatterycontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatterycontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatterycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
