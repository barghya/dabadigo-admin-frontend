import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailPopoverComponent } from './report-detail-popover.component';

describe('ReportDetailPopoverComponent', () => {
  let component: ReportDetailPopoverComponent;
  let fixture: ComponentFixture<ReportDetailPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
