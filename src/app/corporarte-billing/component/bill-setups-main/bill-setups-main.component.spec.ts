import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSetupsMainComponent } from './bill-setups-main.component';

describe('BillSetupsMainComponent', () => {
  let component: BillSetupsMainComponent;
  let fixture: ComponentFixture<BillSetupsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSetupsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSetupsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
