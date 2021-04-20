import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Taskdetails } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { TaskdetailsListAction } from 'src/app/store/actions/fsq_management.action';

@Component({
  selector: 'app-task-detail-popover-container',
  templateUrl: './task-detail-popover-container.component.html',
  styleUrls: ['./task-detail-popover-container.component.scss']
})
export class TaskDetailPopoverContainerComponent implements OnInit {
  workitemId: number; 
  TaskDetailsList$: Observable<Taskdetails[]>;

  private subs = new SubSink();
  constructor(private route: ActivatedRoute,private store: Store<AppState>,public dialogRef: MatDialogRef<TaskDetailPopoverContainerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,) {
    this.workitemId = this.data.work_item_task_id;
   }

  ngOnInit() {
    console.log(this.workitemId);
    this.store.dispatch(new TaskdetailsListAction(this.workitemId));
    this.TaskDetailsList$ = this.store.select(state => state.fsq_management.TaskDetailsList);
  }
  Canceloption(){
    this.dialogRef.close();
  }

}
