import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFsqHubMainComponent } from './admin-fsq-hub-main.component';

describe('AdminFsqHubMainComponent', () => {
  let component: AdminFsqHubMainComponent;
  let fixture: ComponentFixture<AdminFsqHubMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFsqHubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFsqHubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
