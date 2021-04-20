import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestManagementMainContainerComponent } from './corporate-request-management-main-container.component';

describe('CorporateRequestManagementMainContainerComponent', () => {
  let component: CorporateRequestManagementMainContainerComponent;
  let fixture: ComponentFixture<CorporateRequestManagementMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRequestManagementMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRequestManagementMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
