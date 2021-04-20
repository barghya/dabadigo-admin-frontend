import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageHistoryContainerComponent } from './usage-history-container.component';

describe('UsageHistoryContainerComponent', () => {
  let component: UsageHistoryContainerComponent;
  let fixture: ComponentFixture<UsageHistoryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageHistoryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageHistoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
