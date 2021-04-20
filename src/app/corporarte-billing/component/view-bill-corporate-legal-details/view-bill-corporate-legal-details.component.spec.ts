import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillCorporateLegalDetailsComponent } from './view-bill-corporate-legal-details.component';

describe('ViewBillCorporateLegalDetailsComponent', () => {
  let component: ViewBillCorporateLegalDetailsComponent;
  let fixture: ComponentFixture<ViewBillCorporateLegalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillCorporateLegalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillCorporateLegalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
