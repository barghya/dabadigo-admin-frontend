import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRentalPointContainerComponent } from './move-rental-point-container.component';

describe('MoveRentalPointContainerComponent', () => {
  let component: MoveRentalPointContainerComponent;
  let fixture: ComponentFixture<MoveRentalPointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveRentalPointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveRentalPointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
