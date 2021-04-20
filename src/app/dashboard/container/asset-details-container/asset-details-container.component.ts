import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { AssetDetailLoad } from 'src/app/store/actions/asset_inventory.action';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { VehicleInDetail } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-asset-details-container',
  templateUrl: './asset-details-container.component.html',
  styleUrls: ['./asset-details-container.component.scss']
})
export class AssetDetailsContainerComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  assetDetail$: Observable<VehicleInDetail>;
  userType$: Observable<number>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var vehicle_id = +params['id'];
      this.subs.add(this.store.select(state => state.user.userdetail.admn_user_id).subscribe(
        admn_user_id => {
          if(!!admn_user_id) {
            this.store.dispatch(new AssetDetailLoad({vehicle_id, admn_user_id}))
          }
        }
      ))
    }));
    this.userType$ = this.store.select(state => state.user.userdetail.user_type);
    this.assetDetail$ = this.store.select(state => state.asset_inventory.assetDetail);
  }

  View(customer_trip_association_id: number) {
    this.store.select(state=> state.user.userdetail.user_type).pipe(take(1)).subscribe(
      (data)=>{
      if(data == 3){
        this.router.navigate(['franchise-management-trip', 'franchise-trip-details', customer_trip_association_id]);
      }else{
        this.router.navigate(['trip-management', 'trip-details', customer_trip_association_id]);
      }
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
