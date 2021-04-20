import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateManagementMainComponent } from './corporate-management-main.component';

describe('CorporateManagementMainComponent', () => {
  let component: CorporateManagementMainComponent;
  let fixture: ComponentFixture<CorporateManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
