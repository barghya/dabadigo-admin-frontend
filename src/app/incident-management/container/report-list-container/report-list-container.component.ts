import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { WorkItem } from 'src/app/models/fsqManagement';
import { WorkItemListLoadAction } from 'src/app/store/actions/fsq_management.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report-list-container',
  templateUrl: './report-list-container.component.html',
  styleUrls: ['./report-list-container.component.scss']
})
export class ReportListContainerComponent implements OnInit {
  workItemList$: Observable<WorkItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new WorkItemListLoadAction());
    this.workItemList$ = this.store.select(state => state.fsq_management.workItemList);
  }
  
  ReportDetailEvent(id: number) {
    this.router.navigate(['incident-management','incident-detail', id])
  }
}
