import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { countries } from 'src/app/models/asset-inventoryModel';
import { EditRegionLoadAction, EditRegionAction } from 'src/app/store/actions/region_management.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-region-container',
  templateUrl: './edit-region-container.component.html',
  styleUrls: ['./edit-region-container.component.scss']
})
export class EditRegionContainerComponent implements OnInit,OnDestroy {
  subs = new SubSink();
  countriesName$: Observable<countries[]>;
  statesName$: Observable<states[]>;
  regions$: Observable<RegionItem[]>;
  singleRegion$: Observable<RegionItem>;
  cities$: Observable<CityItem[]>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var region_id = +params['id'];
      this.store.dispatch(new EditRegionLoadAction(
        {region_id: region_id}
      ));
    }));
    this.countriesName$ = this.store.select(state => state.region_management.Countries);
    this.statesName$ = this.store.select(state => state.region_management.States);
    this.regions$ = this.store.select(state => state.region_management.RegionList);
    this.singleRegion$ = this.store.select(state => state.region_management.singleRegion);
    this.cities$ = this.store.select(state => state.region_management.cities);
    console.log(this.singleRegion$);
  }
  editRegion(data: RegionItem) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id
        this.store.dispatch(new EditRegionAction(data));
      }
    )
  }
  cancel(){
    this.router.navigate(["region-management",  "region-management-main"], { replaceUrl: true });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
