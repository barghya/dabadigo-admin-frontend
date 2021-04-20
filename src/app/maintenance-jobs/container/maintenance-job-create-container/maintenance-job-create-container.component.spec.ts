import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobCreateContainerComponent } from './maintenance-job-create-container.component';

describe('MaintenanceJobCreateContainerComponent', () => {
  let component: MaintenanceJobCreateContainerComponent;
  let fixture: ComponentFixture<MaintenanceJobCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
