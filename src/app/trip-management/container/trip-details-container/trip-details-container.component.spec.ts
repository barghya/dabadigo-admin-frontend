import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsContainerComponent } from './trip-details-container.component';

describe('TripDetailsContainerComponent', () => {
  let component: TripDetailsContainerComponent;
  let fixture: ComponentFixture<TripDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
