import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MaintenanceJobCreateAction, MaintenanceJobCreateLoadAction } from 'src/app/store/actions/maintenance_jobs.action';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assets } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-maintenance-job-create-container',
  templateUrl: './maintenance-job-create-container.component.html',
  styleUrls: ['./maintenance-job-create-container.component.scss']
})
export class MaintenanceJobCreateContainerComponent implements OnInit {
  vehicles$?: Observable<Assets[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new MaintenanceJobCreateLoadAction());
    this.vehicles$ = this.store.select(state => state.maintenanceJobManagement.vehicles);
  }

  CreateSubmit(vehicle_id: number) {
    this.store.select(user => user.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new MaintenanceJobCreateAction({
          admn_user_id: admn_user_id,
          vehicle_id: vehicle_id,
          problem_code: 17
        }))
      }
    )
  }

  Cancel() {
    this.router.navigate(["maintenance-jobs", "maintenance-jobs-main"]);
  }
}
