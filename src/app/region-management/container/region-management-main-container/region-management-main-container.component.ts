import { Component, OnInit } from '@angular/core';
import { RegionItem } from 'src/app/models/regionManagement';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { RegionManagementLoadAction } from 'src/app/store/actions/region_management.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-management-main-container',
  templateUrl: './region-management-main-container.component.html',
  styleUrls: ['./region-management-main-container.component.scss']
})
export class RegionManagementMainContainerComponent implements OnInit {
  regionList$: Observable<RegionItem[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new RegionManagementLoadAction());
    this.regionList$ = this.store.select(state => state.region_management.RegionList);
  }
  addRegion() {
    this.router.navigate(["region-management", "add-region"]);
  }
  editRegion(region_id: number){
    this.router.navigate(["region-management", "edit-region", region_id]);
  }

}
