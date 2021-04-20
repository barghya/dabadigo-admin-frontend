import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingMainContainerComponent } from './pricing-main-container.component';

describe('PricingMainContainerComponent', () => {
  let component: PricingMainContainerComponent;
  let fixture: ComponentFixture<PricingMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
