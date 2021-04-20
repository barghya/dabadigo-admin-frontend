import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBillsMainContainerComponent } from './franchise-bills-main-container.component';

describe('FranchiseBillsMainContainerComponent', () => {
  let component: FranchiseBillsMainContainerComponent;
  let fixture: ComponentFixture<FranchiseBillsMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseBillsMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBillsMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
