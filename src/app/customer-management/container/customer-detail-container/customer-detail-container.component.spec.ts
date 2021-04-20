import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailContainerComponent } from './customer-detail-container.component';

describe('CustomerDetailContainerComponent', () => {
  let component: CustomerDetailContainerComponent;
  let fixture: ComponentFixture<CustomerDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
