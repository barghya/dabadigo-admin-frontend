import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryMainContainerComponent } from './battery-main-container.component';

describe('BatteryMainContainerComponent', () => {
  let component: BatteryMainContainerComponent;
  let fixture: ComponentFixture<BatteryMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
