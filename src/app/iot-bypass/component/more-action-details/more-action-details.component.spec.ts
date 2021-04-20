import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreActionDetailsComponent } from './more-action-details.component';

describe('MoreActionDetailsComponent', () => {
  let component: MoreActionDetailsComponent;
  let fixture: ComponentFixture<MoreActionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreActionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreActionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
