import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeviceTransactionsComponent } from './view-device-transactions.component';

describe('ViewDeviceTransactionsComponent', () => {
  let component: ViewDeviceTransactionsComponent;
  let fixture: ComponentFixture<ViewDeviceTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeviceTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeviceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
