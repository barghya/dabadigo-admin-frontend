import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointMainContainerComponent } from './rental-point-main-container.component';

describe('RentalPointMainContainerComponent', () => {
  let component: RentalPointMainContainerComponent;
  let fixture: ComponentFixture<RentalPointMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
