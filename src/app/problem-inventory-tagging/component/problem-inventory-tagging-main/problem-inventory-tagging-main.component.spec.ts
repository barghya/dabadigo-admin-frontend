import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemInventoryTaggingMainComponent } from './problem-inventory-tagging-main.component';

describe('ProblemInventoryTaggingMainComponent', () => {
  let component: ProblemInventoryTaggingMainComponent;
  let fixture: ComponentFixture<ProblemInventoryTaggingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemInventoryTaggingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemInventoryTaggingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
