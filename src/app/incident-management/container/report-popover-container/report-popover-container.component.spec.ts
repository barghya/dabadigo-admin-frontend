import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPopoverContainerComponent } from './report-popover-container.component';

describe('ReportPopoverContainerComponent', () => {
  let component: ReportPopoverContainerComponent;
  let fixture: ComponentFixture<ReportPopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
