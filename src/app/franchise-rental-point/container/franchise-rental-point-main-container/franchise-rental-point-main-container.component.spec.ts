import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRentalPointMainContainerComponent } from './franchise-rental-point-main-container.component';

describe('FranchiseRentalPointMainContainerComponent', () => {
  let component: FranchiseRentalPointMainContainerComponent;
  let fixture: ComponentFixture<FranchiseRentalPointMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseRentalPointMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseRentalPointMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
