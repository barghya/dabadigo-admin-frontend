import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBillDetailsComponent } from './franchise-bill-details.component';

describe('FranchiseBillDetailsComponent', () => {
  let component: FranchiseBillDetailsComponent;
  let fixture: ComponentFixture<FranchiseBillDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseBillDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
