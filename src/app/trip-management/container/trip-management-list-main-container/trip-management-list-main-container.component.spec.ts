import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripManagementListMainContainerComponent } from './trip-management-list-main-container.component';

describe('TripManagementListMainContainerComponent', () => {
  let component: TripManagementListMainContainerComponent;
  let fixture: ComponentFixture<TripManagementListMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripManagementListMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripManagementListMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
