import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginPasswordchangeContainerComponent } from './first-login-passwordchange-container.component';

describe('FirstLoginPasswordchangeContainerComponent', () => {
  let component: FirstLoginPasswordchangeContainerComponent;
  let fixture: ComponentFixture<FirstLoginPasswordchangeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLoginPasswordchangeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginPasswordchangeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
