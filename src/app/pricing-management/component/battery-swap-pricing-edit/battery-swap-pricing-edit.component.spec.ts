import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterySwapPricingEditComponent } from './battery-swap-pricing-edit.component';

describe('BatterySwapPricingEditComponent', () => {
  let component: BatterySwapPricingEditComponent;
  let fixture: ComponentFixture<BatterySwapPricingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterySwapPricingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterySwapPricingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
