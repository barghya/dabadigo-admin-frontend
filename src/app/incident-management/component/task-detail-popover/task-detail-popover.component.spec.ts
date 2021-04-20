import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailPopoverComponent } from './task-detail-popover.component';

describe('TaskDetailPopoverComponent', () => {
  let component: TaskDetailPopoverComponent;
  let fixture: ComponentFixture<TaskDetailPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
