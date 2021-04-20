import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable } from 'rxjs';
import { MaintenanceJobItem, MaintenanceJobsFilterPayload } from 'src/app/models/maintenanceJobsModel';
import { MaintenanceJobsLoadAction, MaintenanceJobsFilterAction, MaintenanceRentalpointLoadAction } from 'src/app/store/actions/maintenance_jobs.action';
import { countries, Assets } from 'src/app/models/asset-inventoryModel';
import { states, RegionItem, CityItem } from 'src/app/models/regionManagement';
import { FSQDetails } from 'src/app/models/fsqhubModel';
import { GetRp } from 'src/app/models/rentalPoint';
import { DomainData } from 'src/app/models/domainModel';
import { Router } from '@angular/router';
import { users } from 'src/app/models/userManagement';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-maintenance-jobs-main-container',
  templateUrl: './maintenance-jobs-main-container.component.html',
  styleUrls: ['./maintenance-jobs-main-container.component.scss']
})
export class MaintenanceJobsMainContainerComponent implements OnInit {
  maintenanceJobs$: Observable<MaintenanceJobItem[]>;
  countries$?: Observable<countries[]>;
  states$?: Observable<states[]>;
  regions$?: Observable<RegionItem[]>;
  vehicles$?: Observable<Assets[]>;
  rentalPointList$?: Observable<GetRp[]>;
  problemStatusList$?: Observable<DomainData[]>;
  fsqLevelList$?: Observable<DomainData[]>;
  cities$?: Observable<CityItem[]>;
  activeBeus$?: Observable<users[]>;
  beu_id?: number;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.profile_management.singleProfile).pipe(take(1)).subscribe(
      userDetail => {
        if (!!userDetail) {
          if(userDetail.role_id == 1 || userDetail.role_id == 8) {
            this.MaintenanceJobsLoad();
          }
          else {
            this.MaintenanceJobsLoad(userDetail.admn_user_id);
            this.beu_id = userDetail.admn_user_id;
          }
        }
        else {
          this.MaintenanceJobsLoad();
        }
      }
    )
    this.maintenanceJobs$ = this.store.select(state => state.maintenanceJobManagement.maintenanceJobs);
    this.countries$ = this.store.select(state => state.maintenanceJobManagement.countries);
    this.problemStatusList$ = this.store.select(state => state.maintenanceJobManagement.problemStatusList);
    this.regions$ = this.store.select(state => state.maintenanceJobManagement.regions);
    this.rentalPointList$ = this.store.select(state => state.maintenanceJobManagement.rentalPointList);
    this.states$ = this.store.select(state => state.maintenanceJobManagement.states);
    this.vehicles$ = this.store.select(state => state.maintenanceJobManagement.vehicles);
    this.fsqLevelList$ = this.store.select(state => state.maintenanceJobManagement.fsqLevelList);
    this.cities$ = this.store.select(state => state.maintenanceJobManagement.cities);
    this.activeBeus$ = this.store.select(state => state.maintenanceJobManagement.activeBeus);
  }

  MaintenanceJobsLoad(managing_beu?: number) {
    this.store.dispatch(new MaintenanceJobsLoadAction({
      past_flag: false,
      city_id: null,
      country_id: null,
      days_under_maintenance: null,
      franchisee_id: null,
      fsq_id: null,
      fsq_level: null,
      managing_beu: !!managing_beu ? managing_beu : null,
      problem_status: null,
      region_id: null,
      rentalpoint_id: null,
      state_id: null,
      vehicle_id: null,
      start_date: null,
      end_date: null
    }));
  }

  FilterMaintenanceData(data: MaintenanceJobsFilterPayload) {
    this.store.dispatch(new MaintenanceJobsFilterAction(data));
  }

  View(work_item_id: number) {
    this.router.navigate(["maintenance-jobs", "maintenance-job-detail", work_item_id]);
  }

  Create() {
    this.router.navigate(["maintenance-jobs", "maintenance-job-create"]);
  }

  RegionSelected(region_id: number) {
    this.store.dispatch(new MaintenanceRentalpointLoadAction(region_id));
  }
}
