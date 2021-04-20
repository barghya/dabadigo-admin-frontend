import { Component, OnInit, Inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { GetIncidentDetailAction } from 'src/app/store/actions/fsq_management.action';
import { Observable } from 'rxjs';
import { IncidentDetail } from 'src/app/models/fsqManagement';
import { TaskDetailPopoverContainerComponent } from '../task-detail-popover-container/task-detail-popover-container.component';


@Component({
  selector: 'app-report-detail-popover-container',
  templateUrl: './report-detail-popover-container.component.html',
  styleUrls: ['./report-detail-popover-container.component.scss']
})
export class ReportDetailPopoverContainerComponent implements OnInit {
  work_item_id: number;
  workDetail$: Observable<IncidentDetail>;
 
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute,) { 
      // this.work_item_id = data.work_item_id;
      // console.log(this.work_item_id);
      this.route.params.subscribe(
        param => {
          this.work_item_id = +param['id'];
        }
      )
    }

  ngOnInit() {
    this.store.dispatch(new GetIncidentDetailAction({work_item_id: this.work_item_id}));
    this.workDetail$= this.store.select(state=> state.fsq_management.incidentDetail);
  }

  RefreshData() {
    this.store.dispatch(new GetIncidentDetailAction({work_item_id: this.work_item_id}));
  }
 
}
