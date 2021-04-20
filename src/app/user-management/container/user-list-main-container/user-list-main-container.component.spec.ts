import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMainContainerComponent } from './user-list-main-container.component';

describe('UserListMainContainerComponent', () => {
  let component: UserListMainContainerComponent;
  let fixture: ComponentFixture<UserListMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
