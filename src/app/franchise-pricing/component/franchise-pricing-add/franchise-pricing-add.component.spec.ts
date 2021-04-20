import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingAddComponent } from './franchise-pricing-add.component';

describe('FranchisePricingAddComponent', () => {
  let component: FranchisePricingAddComponent;
  let fixture: ComponentFixture<FranchisePricingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
