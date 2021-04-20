import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FranchiseAssets } from 'src/app/models/franchiseVehicleModel';
import { FranchiseVehicleLoadAction } from 'src/app/store/actions/franchise_vehicle.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-franchise-asset-main-container',
  templateUrl: './franchise-asset-main-container.component.html',
  styleUrls: ['./franchise-asset-main-container.component.scss']
})
export class FranchiseAssetMainContainerComponent implements OnInit {
  assets$: Observable<FranchiseAssets[]>
  subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.store.select(state => state.user.userdetail.admn_user_id).subscribe(
      admn_user_id => {
        this.store.dispatch(new FranchiseVehicleLoadAction(admn_user_id));
      }
    ))
    
    this.assets$ = this.store.select(state => state.franchisee_vehicle.Assets);
  }
  ViewAseet(vehicle_id: number) {
    this.router.navigate(["dashboard", "asset-details", vehicle_id]);
  } 
}
