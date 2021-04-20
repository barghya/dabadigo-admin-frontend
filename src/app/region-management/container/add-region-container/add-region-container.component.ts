import { Component, OnInit } from '@angular/core';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/asset-inventoryModel';
import { AddRegionLoadAction, AddRegionAction } from 'src/app/store/actions/region_management.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-region-container',
  templateUrl: './add-region-container.component.html',
  styleUrls: ['./add-region-container.component.scss']
})
export class AddRegionContainerComponent implements OnInit {
  countriesName$: Observable<countries[]>;
  statesName$: Observable<states[]>;
  regions$: Observable<RegionItem[]>;
  cities$: Observable<CityItem[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddRegionLoadAction());
    this.countriesName$ = this.store.select(state => state.region_management.Countries);
    this.statesName$ = this.store.select(state => state.region_management.States);
    this.regions$ = this.store.select(state => state.region_management.RegionList);
    this.cities$ = this.store.select(state => state.region_management.cities);
  }
 
  AddRegion(data: RegionItem) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.created_by_id = admn_user_id
        data.admn_user_id = admn_user_id
        this.store.dispatch(new AddRegionAction(data));
      }
    )
  }
  CancelAdd() {
    this.router.navigate(["region-management", "region-management-main"], { replaceUrl: true });
  }

}
