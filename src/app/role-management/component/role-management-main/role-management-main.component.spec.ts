import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementMainComponent } from './role-management-main.component';

describe('RoleManagementMainComponent', () => {
  let component: RoleManagementMainComponent;
  let fixture: ComponentFixture<RoleManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
