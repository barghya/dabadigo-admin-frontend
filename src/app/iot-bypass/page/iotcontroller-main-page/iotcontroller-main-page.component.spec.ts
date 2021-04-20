import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotcontrollerMainPageComponent } from './iotcontroller-main-page.component';

describe('IotcontrollerMainPageComponent', () => {
  let component: IotcontrollerMainPageComponent;
  let fixture: ComponentFixture<IotcontrollerMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotcontrollerMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotcontrollerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
