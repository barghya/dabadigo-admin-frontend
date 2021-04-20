import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPopoverComponent } from './report-popover.component';

describe('ReportPopoverComponent', () => {
  let component: ReportPopoverComponent;
  let fixture: ComponentFixture<ReportPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
