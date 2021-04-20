import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillDetailsContainerComponent } from './view-bill-details-container.component';

describe('ViewBillDetailsContainerComponent', () => {
  let component: ViewBillDetailsContainerComponent;
  let fixture: ComponentFixture<ViewBillDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
