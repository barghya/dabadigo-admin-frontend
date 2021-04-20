import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPointMainComponent } from './rental-point-main.component';

describe('RentalPointMainComponent', () => {
  let component: RentalPointMainComponent;
  let fixture: ComponentFixture<RentalPointMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPointMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPointMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
