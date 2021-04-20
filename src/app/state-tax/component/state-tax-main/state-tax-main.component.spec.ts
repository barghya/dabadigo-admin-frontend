import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTaxMainComponent } from './state-tax-main.component';

describe('StateTaxMainComponent', () => {
  let component: StateTaxMainComponent;
  let fixture: ComponentFixture<StateTaxMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTaxMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTaxMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
