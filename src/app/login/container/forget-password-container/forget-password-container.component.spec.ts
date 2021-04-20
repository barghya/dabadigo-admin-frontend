import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordContainerComponent } from './forget-password-container.component';

describe('ForgetPasswordContainerComponent', () => {
  let component: ForgetPasswordContainerComponent;
  let fixture: ComponentFixture<ForgetPasswordContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
