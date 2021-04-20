import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingEditContainerComponent } from './pricing-edit-container.component';

describe('PricingEditContainerComponent', () => {
  let component: PricingEditContainerComponent;
  let fixture: ComponentFixture<PricingEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
