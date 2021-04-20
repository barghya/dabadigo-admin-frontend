import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersManagementContainerComponent } from './parameters-management-container.component';

describe('ParametersManagementContainerComponent', () => {
  let component: ParametersManagementContainerComponent;
  let fixture: ComponentFixture<ParametersManagementContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersManagementContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersManagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
