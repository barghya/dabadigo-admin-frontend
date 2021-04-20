import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterySwapPricingAddComponent } from './battery-swap-pricing-add.component';

describe('BatterySwapPricingAddComponent', () => {
  let component: BatterySwapPricingAddComponent;
  let fixture: ComponentFixture<BatterySwapPricingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterySwapPricingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterySwapPricingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
