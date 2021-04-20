import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginPasswordchangeComponent } from './first-login-passwordchange.component';

describe('FirstLoginPasswordchangeComponent', () => {
  let component: FirstLoginPasswordchangeComponent;
  let fixture: ComponentFixture<FirstLoginPasswordchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLoginPasswordchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginPasswordchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
