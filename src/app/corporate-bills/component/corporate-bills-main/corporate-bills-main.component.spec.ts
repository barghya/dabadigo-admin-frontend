import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillsMainComponent } from './corporate-bills-main.component';

describe('CorporateBillsMainComponent', () => {
  let component: CorporateBillsMainComponent;
  let fixture: ComponentFixture<CorporateBillsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
