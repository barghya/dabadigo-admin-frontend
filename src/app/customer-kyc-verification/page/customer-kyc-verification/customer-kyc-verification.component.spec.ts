import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKycVerificationComponent } from './customer-kyc-verification.component';

describe('CustomerKycVerificationComponent', () => {
  let component: CustomerKycVerificationComponent;
  let fixture: ComponentFixture<CustomerKycVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKycVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKycVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
