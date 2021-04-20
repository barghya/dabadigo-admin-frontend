import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseManagementTripPageComponent } from './franchise-management-trip-page.component';

describe('FranchiseManagementTripPageComponent', () => {
  let component: FranchiseManagementTripPageComponent;
  let fixture: ComponentFixture<FranchiseManagementTripPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseManagementTripPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseManagementTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
