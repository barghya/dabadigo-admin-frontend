import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKycVerificationMainContainerComponent } from './customer-kyc-verification-main-container.component';

describe('CustomerKycVerificationMainContainerComponent', () => {
  let component: CustomerKycVerificationMainContainerComponent;
  let fixture: ComponentFixture<CustomerKycVerificationMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKycVerificationMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKycVerificationMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
