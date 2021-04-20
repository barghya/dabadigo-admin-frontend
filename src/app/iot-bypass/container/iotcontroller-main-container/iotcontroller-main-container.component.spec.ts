import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotcontrollerMainContainerComponent } from './iotcontroller-main-container.component';

describe('IotcontrollerMainContainerComponent', () => {
  let component: IotcontrollerMainContainerComponent;
  let fixture: ComponentFixture<IotcontrollerMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotcontrollerMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotcontrollerMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
