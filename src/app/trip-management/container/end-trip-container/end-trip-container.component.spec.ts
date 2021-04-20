import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTripContainerComponent } from './end-trip-container.component';

describe('EndTripContainerComponent', () => {
  let component: EndTripContainerComponent;
  let fixture: ComponentFixture<EndTripContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndTripContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndTripContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
