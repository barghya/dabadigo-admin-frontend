import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCouponContainerComponent } from './edit-coupon-container.component';

describe('EditCouponContainerComponent', () => {
  let component: EditCouponContainerComponent;
  let fixture: ComponentFixture<EditCouponContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCouponContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCouponContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
