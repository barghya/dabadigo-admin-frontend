import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKycVerificationMainComponent } from './customer-kyc-verification-main.component';

describe('CustomerKycVerificationMainComponent', () => {
  let component: CustomerKycVerificationMainComponent;
  let fixture: ComponentFixture<CustomerKycVerificationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKycVerificationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKycVerificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
