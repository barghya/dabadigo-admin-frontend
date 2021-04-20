import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTripMainComponent } from './franchise-trip-main.component';

describe('FranchiseTripMainComponent', () => {
  let component: FranchiseTripMainComponent;
  let fixture: ComponentFixture<FranchiseTripMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTripMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTripMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
