import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseePaymentsComponent } from './franchisee-payments.component';

describe('FranchiseePaymentsComponent', () => {
  let component: FranchiseePaymentsComponent;
  let fixture: ComponentFixture<FranchiseePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
