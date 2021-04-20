import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateManagementMainContainerComponent } from './corporate-management-main-container.component';

describe('CorporateManagementMainContainerComponent', () => {
  let component: CorporateManagementMainContainerComponent;
  let fixture: ComponentFixture<CorporateManagementMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateManagementMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateManagementMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
