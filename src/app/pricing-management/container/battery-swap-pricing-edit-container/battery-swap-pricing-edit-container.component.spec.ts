import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterySwapPricingEditContainerComponent } from './battery-swap-pricing-edit-container.component';

describe('BatterySwapPricingEditContainerComponent', () => {
  let component: BatterySwapPricingEditContainerComponent;
  let fixture: ComponentFixture<BatterySwapPricingEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterySwapPricingEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterySwapPricingEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
