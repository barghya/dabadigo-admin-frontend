import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentalPointComponent } from './add-rental-point.component';

describe('AddRentalPointComponent', () => {
  let component: AddRentalPointComponent;
  let fixture: ComponentFixture<AddRentalPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentalPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentalPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
