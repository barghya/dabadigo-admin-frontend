import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCodeManagementComponent } from './corporate-code-management.component';

describe('CorporateCodeManagementComponent', () => {
  let component: CorporateCodeManagementComponent;
  let fixture: ComponentFixture<CorporateCodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
