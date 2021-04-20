import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBasicDetailsComponent } from './corporate-basic-details.component';

describe('CorporateBasicDetailsComponent', () => {
  let component: CorporateBasicDetailsComponent;
  let fixture: ComponentFixture<CorporateBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
