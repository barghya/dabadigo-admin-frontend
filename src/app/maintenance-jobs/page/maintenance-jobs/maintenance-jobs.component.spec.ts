import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobsComponent } from './maintenance-jobs.component';

describe('MaintenanceJobsComponent', () => {
  let component: MaintenanceJobsComponent;
  let fixture: ComponentFixture<MaintenanceJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
