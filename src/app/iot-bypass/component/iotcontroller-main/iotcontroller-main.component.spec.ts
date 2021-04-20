import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotcontrollerMainComponent } from './iotcontroller-main.component';

describe('IotcontrollerMainComponent', () => {
  let component: IotcontrollerMainComponent;
  let fixture: ComponentFixture<IotcontrollerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotcontrollerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotcontrollerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
