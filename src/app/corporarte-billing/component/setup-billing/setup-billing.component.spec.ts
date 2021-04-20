import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBillingComponent } from './setup-billing.component';

describe('SetupBillingComponent', () => {
  let component: SetupBillingComponent;
  let fixture: ComponentFixture<SetupBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
