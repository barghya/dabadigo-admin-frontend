import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingAddContainerComponent } from './pricing-add-container.component';

describe('PricingAddContainerComponent', () => {
  let component: PricingAddContainerComponent;
  let fixture: ComponentFixture<PricingAddContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
