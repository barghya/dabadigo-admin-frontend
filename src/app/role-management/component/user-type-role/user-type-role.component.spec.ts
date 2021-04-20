import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeRoleComponent } from './user-type-role.component';

describe('UserTypeRoleComponent', () => {
  let component: UserTypeRoleComponent;
  let fixture: ComponentFixture<UserTypeRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
