import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSetupsMainContainerComponent } from './bill-setups-main-container.component';

describe('BillSetupsMainContainerComponent', () => {
  let component: BillSetupsMainContainerComponent;
  let fixture: ComponentFixture<BillSetupsMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSetupsMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSetupsMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
