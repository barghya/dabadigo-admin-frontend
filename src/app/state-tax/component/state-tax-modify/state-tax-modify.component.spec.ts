import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTaxModifyComponent } from './state-tax-modify.component';

describe('StateTaxModifyComponent', () => {
  let component: StateTaxModifyComponent;
  let fixture: ComponentFixture<StateTaxModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTaxModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTaxModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
