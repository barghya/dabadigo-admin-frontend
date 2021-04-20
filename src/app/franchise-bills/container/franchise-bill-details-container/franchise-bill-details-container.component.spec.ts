import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseBillDetailsContainerComponent } from './franchise-bill-details-container.component';

describe('FranchiseBillDetailsContainerComponent', () => {
  let component: FranchiseBillDetailsContainerComponent;
  let fixture: ComponentFixture<FranchiseBillDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseBillDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseBillDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
