import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRentalPointComponent } from './move-rental-point.component';

describe('MoveRentalPointComponent', () => {
  let component: MoveRentalPointComponent;
  let fixture: ComponentFixture<MoveRentalPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveRentalPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveRentalPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
