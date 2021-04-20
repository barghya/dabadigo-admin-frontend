import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTaxMainContainerComponent } from './state-tax-main-container.component';

describe('StateTaxMainContainerComponent', () => {
  let component: StateTaxMainContainerComponent;
  let fixture: ComponentFixture<StateTaxMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTaxMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTaxMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
