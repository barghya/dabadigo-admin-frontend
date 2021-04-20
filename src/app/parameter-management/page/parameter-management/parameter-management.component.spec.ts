import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterManagementComponent } from './parameter-management.component';

describe('ParameterManagementComponent', () => {
  let component: ParameterManagementComponent;
  let fixture: ComponentFixture<ParameterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
