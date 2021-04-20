import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMainContainerComponent } from './login-main-container.component';

describe('LoginMainContainerComponent', () => {
  let component: LoginMainContainerComponent;
  let fixture: ComponentFixture<LoginMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
