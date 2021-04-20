import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailPopoverContainerComponent } from './report-detail-popover-container.component';

describe('ReportDetailPopoverContainerComponent', () => {
  let component: ReportDetailPopoverContainerComponent;
  let fixture: ComponentFixture<ReportDetailPopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailPopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
