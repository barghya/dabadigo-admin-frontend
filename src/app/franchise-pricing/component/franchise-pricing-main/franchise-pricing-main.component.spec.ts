import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingMainComponent } from './franchise-pricing-main.component';

describe('FranchisePricingMainComponent', () => {
  let component: FranchisePricingMainComponent;
  let fixture: ComponentFixture<FranchisePricingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
