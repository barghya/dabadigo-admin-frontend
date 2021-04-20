import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentalPointContainerComponent } from './edit-rental-point-container.component';

describe('EditRentalPointContainerComponent', () => {
  let component: EditRentalPointContainerComponent;
  let fixture: ComponentFixture<EditRentalPointContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRentalPointContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRentalPointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
