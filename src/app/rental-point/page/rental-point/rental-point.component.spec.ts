import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointComponent } from './rental-point.component';

describe('RentalPointComponent', () => {
  let component: RentalPointComponent;
  let fixture: ComponentFixture<RentalPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
