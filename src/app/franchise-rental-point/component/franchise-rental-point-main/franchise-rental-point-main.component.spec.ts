import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRentalPointMainComponent } from './franchise-rental-point-main.component';

describe('FranchiseRentalPointMainComponent', () => {
  let component: FranchiseRentalPointMainComponent;
  let fixture: ComponentFixture<FranchiseRentalPointMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseRentalPointMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseRentalPointMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
