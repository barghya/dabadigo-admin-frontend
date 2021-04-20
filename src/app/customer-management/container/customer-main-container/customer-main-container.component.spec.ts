import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainContainerComponent } from './customer-main-container.component';

describe('CustomerMainContainerComponent', () => {
  let component: CustomerMainContainerComponent;
  let fixture: ComponentFixture<CustomerMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
