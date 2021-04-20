import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBillingContainerComponent } from './setup-billing-container.component';

describe('SetupBillingContainerComponent', () => {
  let component: SetupBillingContainerComponent;
  let fixture: ComponentFixture<SetupBillingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupBillingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBillingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
