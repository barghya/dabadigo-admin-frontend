import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { DashboardService } from 'src/app/service/dashboard-service/dashboard.service';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, takeWhile, take } from 'rxjs/operators';
import { DashboardModel } from 'src/app/models/dashboard-model';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { DashboardLoadAction } from 'src/app/store/actions/dashboard.action';
import { users } from 'src/app/models/userManagement';

@Component({
  selector: 'app-dashboard-main-container',
  templateUrl: './dashboard-main-container.component.html',
  styleUrls: ['./dashboard-main-container.component.scss']
})
export class DashboardMainContainerComponent implements OnInit, OnDestroy {
  componentActive: boolean;
  pollingData$: Observable<DashboardModel>;
  regions$: Observable<RegionItem[]>;
  states$: Observable<states[]>;
  cities$: Observable<CityItem[]>;
  userDetail$: Observable<users>;
  admn_user_id: number
  constructor(private dashboardService: DashboardService, private store: Store<AppState>) { }
  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.admn_user_id = admn_user_id
        this.store.dispatch(new DashboardLoadAction(admn_user_id));
      }
    )
    this.regions$ = this.store.select(state => state.dashboard.regions);
    this.states$ = this.store.select(state => state.dashboard.states);
    this.cities$ = this.store.select(state => state.dashboard.cities);
    this.userDetail$ = this.store.select(state => state.dashboard.userDetail);
    this.componentActive = true;
    this.pollingData$ = interval(5000).pipe(
      startWith(0),
      takeWhile(() => this.componentActive),
      switchMap(() => {
        return this.dashboardService.dashboardPolling({ admn_user_id: this.admn_user_id });
      })
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
