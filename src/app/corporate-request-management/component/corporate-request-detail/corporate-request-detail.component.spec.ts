import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestDetailComponent } from './corporate-request-detail.component';

describe('CorporateRequestDetailComponent', () => {
  let component: CorporateRequestDetailComponent;
  let fixture: ComponentFixture<CorporateRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
