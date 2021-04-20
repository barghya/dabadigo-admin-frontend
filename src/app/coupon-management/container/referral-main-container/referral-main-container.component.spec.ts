import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralMainContainerComponent } from './referral-main-container.component';

describe('ReferralMainContainerComponent', () => {
  let component: ReferralMainContainerComponent;
  let fixture: ComponentFixture<ReferralMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
