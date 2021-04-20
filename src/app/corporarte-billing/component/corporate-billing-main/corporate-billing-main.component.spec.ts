import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillingMainComponent } from './corporate-billing-main.component';

describe('CorporateBillingMainComponent', () => {
  let component: CorporateBillingMainComponent;
  let fixture: ComponentFixture<CorporateBillingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
