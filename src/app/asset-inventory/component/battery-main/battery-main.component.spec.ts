import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryMainComponent } from './battery-main.component';

describe('BatteryMainComponent', () => {
  let component: BatteryMainComponent;
  let fixture: ComponentFixture<BatteryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
