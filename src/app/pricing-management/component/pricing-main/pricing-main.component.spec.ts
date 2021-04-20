import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingMainComponent } from './pricing-main.component';

describe('PricingMainComponent', () => {
  let component: PricingMainComponent;
  let fixture: ComponentFixture<PricingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
