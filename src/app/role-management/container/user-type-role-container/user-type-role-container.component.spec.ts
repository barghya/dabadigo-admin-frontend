import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeRoleContainerComponent } from './user-type-role-container.component';

describe('UserTypeRoleContainerComponent', () => {
  let component: UserTypeRoleContainerComponent;
  let fixture: ComponentFixture<UserTypeRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeRoleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeRoleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
