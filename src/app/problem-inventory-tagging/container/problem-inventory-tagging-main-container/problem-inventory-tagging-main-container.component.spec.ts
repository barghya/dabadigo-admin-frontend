import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemInventoryTaggingMainContainerComponent } from './problem-inventory-tagging-main-container.component';

describe('ProblemInventoryTaggingMainContainerComponent', () => {
  let component: ProblemInventoryTaggingMainContainerComponent;
  let fixture: ComponentFixture<ProblemInventoryTaggingMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemInventoryTaggingMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemInventoryTaggingMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
