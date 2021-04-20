import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralMainComponent } from './referral-main.component';

describe('ReferralMainComponent', () => {
  let component: ReferralMainComponent;
  let fixture: ComponentFixture<ReferralMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
