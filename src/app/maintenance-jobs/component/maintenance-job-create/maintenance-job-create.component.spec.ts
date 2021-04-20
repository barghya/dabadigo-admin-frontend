import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceJobCreateComponent } from './maintenance-job-create.component';

describe('MaintenanceJobCreateComponent', () => {
  let component: MaintenanceJobCreateComponent;
  let fixture: ComponentFixture<MaintenanceJobCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceJobCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceJobCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
