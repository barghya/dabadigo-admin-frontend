import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobDetailContainerComponent } from './maintenance-job-detail-container.component';

describe('MaintenanceJobDetailContainerComponent', () => {
  let component: MaintenanceJobDetailContainerComponent;
  let fixture: ComponentFixture<MaintenanceJobDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
