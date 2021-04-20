import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKycVerificationViewComponent } from './customer-kyc-verification-view.component';

describe('CustomerKycVerificationViewComponent', () => {
  let component: CustomerKycVerificationViewComponent;
  let fixture: ComponentFixture<CustomerKycVerificationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKycVerificationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKycVerificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
