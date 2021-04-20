import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRentalPointDetailsContainerComponent } from './franchise-rental-point-details-container.component';

describe('FranchiseRentalPointDetailsContainerComponent', () => {
  let component: FranchiseRentalPointDetailsContainerComponent;
  let fixture: ComponentFixture<FranchiseRentalPointDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseRentalPointDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseRentalPointDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
