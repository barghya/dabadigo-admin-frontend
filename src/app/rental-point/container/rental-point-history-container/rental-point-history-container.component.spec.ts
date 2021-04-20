import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointHistoryContainerComponent } from './rental-point-history-container.component';

describe('RentalPointHistoryContainerComponent', () => {
  let component: RentalPointHistoryContainerComponent;
  let fixture: ComponentFixture<RentalPointHistoryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointHistoryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointHistoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
