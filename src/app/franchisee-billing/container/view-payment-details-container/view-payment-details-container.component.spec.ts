import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentDetailsContainerComponent } from './view-payment-details-container.component';

describe('ViewPaymentDetailsContainerComponent', () => {
  let component: ViewPaymentDetailsContainerComponent;
  let fixture: ComponentFixture<ViewPaymentDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaymentDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
