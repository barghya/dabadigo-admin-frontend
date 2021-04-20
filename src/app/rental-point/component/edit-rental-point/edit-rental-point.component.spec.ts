import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentalPointComponent } from './edit-rental-point.component';

describe('EditRentalPointComponent', () => {
  let component: EditRentalPointComponent;
  let fixture: ComponentFixture<EditRentalPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRentalPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRentalPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
