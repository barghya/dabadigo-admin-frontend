import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillsMainContainerComponent } from './corporate-bills-main-container.component';

describe('CorporateBillsMainContainerComponent', () => {
  let component: CorporateBillsMainContainerComponent;
  let fixture: ComponentFixture<CorporateBillsMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillsMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillsMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
