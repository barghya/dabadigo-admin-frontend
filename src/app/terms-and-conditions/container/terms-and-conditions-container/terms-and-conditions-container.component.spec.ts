import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsContainerComponent } from './terms-and-conditions-container.component';

describe('TermsAndConditionsContainerComponent', () => {
  let component: TermsAndConditionsContainerComponent;
  let fixture: ComponentFixture<TermsAndConditionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
