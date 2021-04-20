import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRentalPointPageComponent } from './franchise-rental-point-page.component';

describe('FranchiseRentalPointPageComponent', () => {
  let component: FranchiseRentalPointPageComponent;
  let fixture: ComponentFixture<FranchiseRentalPointPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseRentalPointPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseRentalPointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
