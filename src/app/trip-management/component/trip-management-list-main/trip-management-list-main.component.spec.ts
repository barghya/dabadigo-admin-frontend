import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripManagementListMainComponent } from './trip-management-list-main.component';

describe('TripManagementListMainComponent', () => {
  let component: TripManagementListMainComponent;
  let fixture: ComponentFixture<TripManagementListMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripManagementListMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripManagementListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
