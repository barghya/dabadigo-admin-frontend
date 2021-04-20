import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingAddContainerComponent } from './franchise-pricing-add-container.component';

describe('FranchisePricingAddContainerComponent', () => {
  let component: FranchisePricingAddContainerComponent;
  let fixture: ComponentFixture<FranchisePricingAddContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
