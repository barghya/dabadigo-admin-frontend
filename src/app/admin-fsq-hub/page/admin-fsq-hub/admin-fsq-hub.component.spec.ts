import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFsqHubComponent } from './admin-fsq-hub.component';

describe('AdminFsqHubComponent', () => {
  let component: AdminFsqHubComponent;
  let fixture: ComponentFixture<AdminFsqHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFsqHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFsqHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
