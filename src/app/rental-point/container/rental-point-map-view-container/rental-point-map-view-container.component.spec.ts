import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointMapViewContainerComponent } from './rental-point-map-view-container.component';

describe('RentalPointMapViewContainerComponent', () => {
  let component: RentalPointMapViewContainerComponent;
  let fixture: ComponentFixture<RentalPointMapViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointMapViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointMapViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
