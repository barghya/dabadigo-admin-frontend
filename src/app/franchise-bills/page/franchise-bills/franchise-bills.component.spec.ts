import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBillsComponent } from './franchise-bills.component';

describe('FranchiseBillsComponent', () => {
  let component: FranchiseBillsComponent;
  let fixture: ComponentFixture<FranchiseBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
