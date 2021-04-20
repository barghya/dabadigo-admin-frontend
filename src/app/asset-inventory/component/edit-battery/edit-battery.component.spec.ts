import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatteryComponent } from './edit-battery.component';

describe('EditBatteryComponent', () => {
  let component: EditBatteryComponent;
  let fixture: ComponentFixture<EditBatteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
