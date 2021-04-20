import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBypassMainContainerComponent } from './trip-bypass-main-container.component';

describe('TripBypassMainContainerComponent', () => {
  let component: TripBypassMainContainerComponent;
  let fixture: ComponentFixture<TripBypassMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBypassMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBypassMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
