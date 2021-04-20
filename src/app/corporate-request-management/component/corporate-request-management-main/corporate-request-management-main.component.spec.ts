import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestManagementMainComponent } from './corporate-request-management-main.component';

describe('CorporateRequestManagementMainComponent', () => {
  let component: CorporateRequestManagementMainComponent;
  let fixture: ComponentFixture<CorporateRequestManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRequestManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRequestManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
