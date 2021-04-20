import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillingMainContainerComponent } from './corporate-billing-main-container.component';

describe('CorporateBillingMainContainerComponent', () => {
  let component: CorporateBillingMainContainerComponent;
  let fixture: ComponentFixture<CorporateBillingMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillingMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillingMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
