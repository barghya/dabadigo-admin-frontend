import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementMainContainerComponent } from './role-management-main-container.component';

describe('RoleManagementMainContainerComponent', () => {
  let component: RoleManagementMainContainerComponent;
  let fixture: ComponentFixture<RoleManagementMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
