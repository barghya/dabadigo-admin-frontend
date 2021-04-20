import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceScheduleContainerComponent } from './maintenance-schedule-container.component';

describe('MaintenanceScheduleContainerComponent', () => {
  let component: MaintenanceScheduleContainerComponent;
  let fixture: ComponentFixture<MaintenanceScheduleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceScheduleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceScheduleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
