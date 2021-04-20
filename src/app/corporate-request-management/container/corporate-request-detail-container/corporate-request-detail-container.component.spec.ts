import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestDetailContainerComponent } from './corporate-request-detail-container.component';

describe('CorporateRequestDetailContainerComponent', () => {
  let component: CorporateRequestDetailContainerComponent;
  let fixture: ComponentFixture<CorporateRequestDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRequestDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRequestDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
