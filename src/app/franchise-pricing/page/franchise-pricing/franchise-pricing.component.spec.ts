import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingComponent } from './franchise-pricing.component';

describe('FranchisePricingComponent', () => {
  let component: FranchisePricingComponent;
  let fixture: ComponentFixture<FranchisePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
