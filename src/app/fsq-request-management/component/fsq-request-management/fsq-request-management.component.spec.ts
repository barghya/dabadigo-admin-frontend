import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqRequestManagementComponent } from './fsq-request-management.component';

describe('FsqRequestManagementComponent', () => {
  let component: FsqRequestManagementComponent;
  let fixture: ComponentFixture<FsqRequestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqRequestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqRequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
