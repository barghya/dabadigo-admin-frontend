import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatteryTransactionsComponent } from './view-battery-transactions.component';

describe('ViewBatteryTransactionsComponent', () => {
  let component: ViewBatteryTransactionsComponent;
  let fixture: ComponentFixture<ViewBatteryTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBatteryTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatteryTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
