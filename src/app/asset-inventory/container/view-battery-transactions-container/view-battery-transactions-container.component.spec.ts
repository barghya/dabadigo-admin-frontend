import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatteryTransactionsContainerComponent } from './view-battery-transactions-container.component';

describe('ViewBatteryTransactionsContainerComponent', () => {
  let component: ViewBatteryTransactionsContainerComponent;
  let fixture: ComponentFixture<ViewBatteryTransactionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBatteryTransactionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatteryTransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
