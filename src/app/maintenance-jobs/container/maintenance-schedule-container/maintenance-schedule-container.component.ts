import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { MaintenanceScheduleItem } from 'src/app/models/maintenanceJobsModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { MaintenanceScheduleLoadAction, MaintenanceScheduleUpdateLoadAction, MaintenanceScheduleUpdateAction } from 'src/app/store/actions/maintenance_jobs.action';

@Component({
  selector: 'app-maintenance-schedule-container',
  templateUrl: './maintenance-schedule-container.component.html',
  styleUrls: ['./maintenance-schedule-container.component.scss']
})
export class MaintenanceScheduleContainerComponent implements OnInit {
  vehicleTypes$: Observable<DomainData[]>;
  maintenanceSchedules$: Observable<MaintenanceScheduleItem[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new MaintenanceScheduleLoadAction());
    this.vehicleTypes$ = this.store.select(state => state.maintenanceJobManagement.vehicleTypes);
    this.maintenanceSchedules$ = this.store.select(state => state.maintenanceJobManagement.maintenanceSchedules);
  }

  VehicleTypeChange(vehicle_type: number) {
    this.store.dispatch(new MaintenanceScheduleUpdateLoadAction(vehicle_type))
  }

  SchedulesSubmit(data: MaintenanceScheduleItem[]) {
    this.store.dispatch(new MaintenanceScheduleUpdateAction(data));
  }
}
