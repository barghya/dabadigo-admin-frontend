import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointHistoryComponent } from './rental-point-history.component';

describe('RentalPointHistoryComponent', () => {
  let component: RentalPointHistoryComponent;
  let fixture: ComponentFixture<RentalPointHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
