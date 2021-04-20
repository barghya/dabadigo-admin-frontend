import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointMapViewComponent } from './rental-point-map-view.component';

describe('RentalPointMapViewComponent', () => {
  let component: RentalPointMapViewComponent;
  let fixture: ComponentFixture<RentalPointMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
