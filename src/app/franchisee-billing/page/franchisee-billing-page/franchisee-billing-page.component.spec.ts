import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeBillingPageComponent } from './franchisee-billing-page.component';

describe('FranchiseeBillingPageComponent', () => {
  let component: FranchiseeBillingPageComponent;
  let fixture: ComponentFixture<FranchiseeBillingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeBillingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeBillingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
