import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MaintenanceJobDetailLoadAction, MaintenanceJobResolveAction, MaintenanceJobAssignLoadAction, MaintenanceJobAssignAction } from 'src/app/store/actions/maintenance_jobs.action';
import { Observable } from 'rxjs';
import { MaintenanceJobItemDetail, MaintenanceJobAssignPayload, MaintenanceJobResolvePayload } from 'src/app/models/maintenanceJobsModel';
import { take } from 'rxjs/operators';
import { FSQDetails } from 'src/app/models/fsqhubModel';
import { Assets } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-maintenance-job-detail-container',
  templateUrl: './maintenance-job-detail-container.component.html',
  styleUrls: ['./maintenance-job-detail-container.component.scss']
})
export class MaintenanceJobDetailContainerComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  maintenanceJobDetail$: Observable<MaintenanceJobItemDetail>;
  fsqList$?: Observable<FSQDetails[]>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(data => {
      this.store.dispatch(new MaintenanceJobDetailLoadAction(+data['id']));
    }))
    this.maintenanceJobDetail$ = this.store.select(state => state.maintenanceJobManagement.maintenanceJobDetail);
    this.fsqList$ = this.store.select(state => state.maintenanceJobManagement.fsqList);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Resolve(data: MaintenanceJobResolvePayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id;
        this.store.dispatch(new MaintenanceJobResolveAction(data));
      }
    )
  }

  AssignLoad() {
    this.store.dispatch(new MaintenanceJobAssignLoadAction());
  }

  AssignSubmit(data: MaintenanceJobAssignPayload) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id;
        this.store.dispatch(new MaintenanceJobAssignAction(data));
      }
    )
  }
}
