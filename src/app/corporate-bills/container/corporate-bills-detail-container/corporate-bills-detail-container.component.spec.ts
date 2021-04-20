import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillsDetailContainerComponent } from './corporate-bills-detail-container.component';

describe('CorporateBillsDetailContainerComponent', () => {
  let component: CorporateBillsDetailContainerComponent;
  let fixture: ComponentFixture<CorporateBillsDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBillsDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillsDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
