import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTripDetailsComponent } from './franchise-trip-details.component';

describe('FranchiseTripDetailsComponent', () => {
  let component: FranchiseTripDetailsComponent;
  let fixture: ComponentFixture<FranchiseTripDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTripDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
