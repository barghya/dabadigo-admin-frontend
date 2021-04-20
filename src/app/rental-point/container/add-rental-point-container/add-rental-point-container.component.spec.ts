import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentalPointContainerComponent } from './add-rental-point-container.component';

describe('AddRentalPointContainerComponent', () => {
  let component: AddRentalPointContainerComponent;
  let fixture: ComponentFixture<AddRentalPointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentalPointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentalPointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
