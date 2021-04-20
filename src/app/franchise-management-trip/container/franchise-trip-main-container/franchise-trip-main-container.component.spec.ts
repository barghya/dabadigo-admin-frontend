import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTripMainContainerComponent } from './franchise-trip-main-container.component';

describe('FranchiseTripMainContainerComponent', () => {
  let component: FranchiseTripMainContainerComponent;
  let fixture: ComponentFixture<FranchiseTripMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTripMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTripMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
