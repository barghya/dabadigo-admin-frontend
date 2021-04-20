import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailPopoverContainerComponent } from './task-detail-popover-container.component';

describe('TaskDetailPopoverContainerComponent', () => {
  let component: TaskDetailPopoverContainerComponent;
  let fixture: ComponentFixture<TaskDetailPopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailPopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
