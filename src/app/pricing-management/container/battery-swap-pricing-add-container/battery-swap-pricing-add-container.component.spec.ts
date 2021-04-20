import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterySwapPricingAddContainerComponent } from './battery-swap-pricing-add-container.component';

describe('BatterySwapPricingAddContainerComponent', () => {
  let component: BatterySwapPricingAddContainerComponent;
  let fixture: ComponentFixture<BatterySwapPricingAddContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterySwapPricingAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterySwapPricingAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
