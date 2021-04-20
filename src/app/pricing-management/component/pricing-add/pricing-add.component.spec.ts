import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingAddComponent } from './pricing-add.component';

describe('PricingAddComponent', () => {
  let component: PricingAddComponent;
  let fixture: ComponentFixture<PricingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
