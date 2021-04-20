import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobsMainContainerComponent } from './maintenance-jobs-main-container.component';

describe('MaintenanceJobsMainContainerComponent', () => {
  let component: MaintenanceJobsMainContainerComponent;
  let fixture: ComponentFixture<MaintenanceJobsMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobsMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobsMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
