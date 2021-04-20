import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMainComponent } from './user-list-main.component';

describe('UserListMainComponent', () => {
  let component: UserListMainComponent;
  let fixture: ComponentFixture<UserListMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
