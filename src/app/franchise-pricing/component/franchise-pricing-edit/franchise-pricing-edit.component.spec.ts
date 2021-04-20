import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePricingEditComponent } from './franchise-pricing-edit.component';

describe('FranchisePricingEditComponent', () => {
  let component: FranchisePricingEditComponent;
  let fixture: ComponentFixture<FranchisePricingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePricingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePricingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
