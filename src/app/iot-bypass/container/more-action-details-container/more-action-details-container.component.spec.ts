import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreActionDetailsContainerComponent } from './more-action-details-container.component';

describe('MoreActionDetailsContainerComponent', () => {
  let component: MoreActionDetailsContainerComponent;
  let fixture: ComponentFixture<MoreActionDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreActionDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreActionDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
