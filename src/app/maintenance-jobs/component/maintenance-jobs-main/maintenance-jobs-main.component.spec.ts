import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobsMainComponent } from './maintenance-jobs-main.component';

describe('MaintenanceJobsMainComponent', () => {
  let component: MaintenanceJobsMainComponent;
  let fixture: ComponentFixture<MaintenanceJobsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
