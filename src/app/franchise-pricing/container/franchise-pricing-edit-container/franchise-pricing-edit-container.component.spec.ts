import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingEditContainerComponent } from './franchise-pricing-edit-container.component';

describe('FranchisePricingEditContainerComponent', () => {
  let component: FranchisePricingEditContainerComponent;
  let fixture: ComponentFixture<FranchisePricingEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
