import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRentalPointDetailsComponent } from './franchise-rental-point-details.component';

describe('FranchiseRentalPointDetailsComponent', () => {
  let component: FranchiseRentalPointDetailsComponent;
  let fixture: ComponentFixture<FranchiseRentalPointDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseRentalPointDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseRentalPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
