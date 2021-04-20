import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeviceTransactionsContainerComponent } from './view-device-transactions-container.component';

describe('ViewDeviceTransactionsContainerComponent', () => {
  let component: ViewDeviceTransactionsContainerComponent;
  let fixture: ComponentFixture<ViewDeviceTransactionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeviceTransactionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeviceTransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
