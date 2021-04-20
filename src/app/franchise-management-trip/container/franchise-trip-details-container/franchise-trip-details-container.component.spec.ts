import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTripDetailsContainerComponent } from './franchise-trip-details-container.component';

describe('FranchiseTripDetailsContainerComponent', () => {
  let component: FranchiseTripDetailsContainerComponent;
  let fixture: ComponentFixture<FranchiseTripDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTripDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTripDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
