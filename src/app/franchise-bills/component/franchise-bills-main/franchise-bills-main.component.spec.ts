import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBillsMainComponent } from './franchise-bills-main.component';

describe('FranchiseBillsMainComponent', () => {
  let component: FranchiseBillsMainComponent;
  let fixture: ComponentFixture<FranchiseBillsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseBillsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBillsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
