import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKycVerificationViewContainerComponent } from './customer-kyc-verification-view-container.component';

describe('CustomerKycVerificationViewContainerComponent', () => {
  let component: CustomerKycVerificationViewContainerComponent;
  let fixture: ComponentFixture<CustomerKycVerificationViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKycVerificationViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKycVerificationViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
