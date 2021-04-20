import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillsDetailComponent } from './corporate-bills-detail.component';

describe('CorporateBillsDetailComponent', () => {
  let component: CorporateBillsDetailComponent;
  let fixture: ComponentFixture<CorporateBillsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
