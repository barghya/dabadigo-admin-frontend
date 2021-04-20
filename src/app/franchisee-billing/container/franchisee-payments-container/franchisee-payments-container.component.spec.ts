import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseePaymentsContainerComponent } from './franchisee-payments-container.component';

describe('FranchiseePaymentsContainerComponent', () => {
  let component: FranchiseePaymentsContainerComponent;
  let fixture: ComponentFixture<FranchiseePaymentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseePaymentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseePaymentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
