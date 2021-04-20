import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListContainerComponent } from './report-list-container.component';

describe('ReportListContainerComponent', () => {
  let component: ReportListContainerComponent;
  let fixture: ComponentFixture<ReportListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
