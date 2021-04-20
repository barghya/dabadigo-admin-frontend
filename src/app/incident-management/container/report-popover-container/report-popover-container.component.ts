import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkItemAssignLoadAction, WorkItemAssignAction } from 'src/app/store/actions/fsq_management.action';
import { FSQDetails, WorkItemInDetail, WorkItemAssignmentRequest } from 'src/app/models/fsqManagement';

@Component({
  selector: 'app-report-popover-container',
  templateUrl: './report-popover-container.component.html',
  styleUrls: ['./report-popover-container.component.scss']
})
export class ReportPopoverContainerComponent implements OnInit {
  subs = new SubSink();
  activeFsqList$: Observable<FSQDetails[]>;
  workItem$: Observable<WorkItemInDetail>;
  work_item_id: number;
  constructor(private store: Store<AppState>, private router: Router, public dialogRef: MatDialogRef<ReportPopoverContainerComponent>, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.work_item_id = data.work_item_id;
      console.log(this.work_item_id);
  }

  ngOnInit() {
    this.store.dispatch(new WorkItemAssignLoadAction(this.work_item_id));
    this.activeFsqList$ = this.store.select(state => state.fsq_management.activeFsq);
    this.workItem$ = this.store.select(state => state.fsq_management.singleWorkItem);
  }

  Submit(value: WorkItemAssignmentRequest) {
    console.log(value);
    
    this.store.dispatch(new WorkItemAssignAction(value));
    this.dialogRef.close(value);
  }

  ClosePopup() {
    this.dialogRef.close();
  }
}
