import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersManagementComponent } from './parameters-management.component';

describe('ParametersManagementComponent', () => {
  let component: ParametersManagementComponent;
  let fixture: ComponentFixture<ParametersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
