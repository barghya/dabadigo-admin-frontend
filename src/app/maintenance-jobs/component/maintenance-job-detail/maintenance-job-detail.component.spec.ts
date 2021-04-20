import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobDetailComponent } from './maintenance-job-detail.component';

describe('MaintenanceJobDetailComponent', () => {
  let component: MaintenanceJobDetailComponent;
  let fixture: ComponentFixture<MaintenanceJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
