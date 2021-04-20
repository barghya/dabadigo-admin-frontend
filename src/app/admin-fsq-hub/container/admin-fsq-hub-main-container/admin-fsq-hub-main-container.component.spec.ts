import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFsqHubMainContainerComponent } from './admin-fsq-hub-main-container.component';

describe('AdminFsqHubMainContainerComponent', () => {
  let component: AdminFsqHubMainContainerComponent;
  let fixture: ComponentFixture<AdminFsqHubMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFsqHubMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFsqHubMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
