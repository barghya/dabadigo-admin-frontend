import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainContainerComponent } from './dashboard-main-container.component';

describe('DashboardMainContainerComponent', () => {
  let component: DashboardMainContainerComponent;
  let fixture: ComponentFixture<DashboardMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
