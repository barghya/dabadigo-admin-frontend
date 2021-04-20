import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestManagementComponent } from './corporate-request-management.component';

describe('CorporateRequestManagementComponent', () => {
  let component: CorporateRequestManagementComponent;
  let fixture: ComponentFixture<CorporateRequestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRequestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
