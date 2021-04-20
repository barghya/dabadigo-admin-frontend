import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemInventoryTaggingComponent } from './problem-inventory-tagging.component';

describe('ProblemInventoryTaggingComponent', () => {
  let component: ProblemInventoryTaggingComponent;
  let fixture: ComponentFixture<ProblemInventoryTaggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemInventoryTaggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemInventoryTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
