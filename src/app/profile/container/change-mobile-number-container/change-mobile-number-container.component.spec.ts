import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobileNumberContainerComponent } from './change-mobile-number-container.component';

describe('ChangeMobileNumberContainerComponent', () => {
  let component: ChangeMobileNumberContainerComponent;
  let fixture: ComponentFixture<ChangeMobileNumberContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMobileNumberContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileNumberContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
