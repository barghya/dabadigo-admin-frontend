import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingMainContainerComponent } from './franchise-pricing-main-container.component';

describe('FranchisePricingMainContainerComponent', () => {
  let component: FranchisePricingMainContainerComponent;
  let fixture: ComponentFixture<FranchisePricingMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
