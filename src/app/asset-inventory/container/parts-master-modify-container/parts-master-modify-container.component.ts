import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsMasterUpdateLoadAction, PartsMasterCreateLoadAction, PartsMasterCreateAction, PartsMasterUpdateAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { PartsMasterItem, countries } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-parts-master-modify-container',
  templateUrl: './parts-master-modify-container.component.html',
  styleUrls: ['./parts-master-modify-container.component.scss']
})
export class PartsMasterModifyContainerComponent implements OnInit {
  singlePartsMaster$: Observable<PartsMasterItem>;
  countries$: Observable<countries[]>;

  private subs = new SubSink();

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      var parts_master_id = +params['id'];
      if(!!parts_master_id) {
        this.store.dispatch(new PartsMasterUpdateLoadAction(parts_master_id))
      }
      else {
        this.store.dispatch(new PartsMasterCreateLoadAction())
      }
    }));

    this.singlePartsMaster$ = this.store.select(state => state.asset_inventory.singlePartsMaster);
    this.countries$ = this.store.select(state => state.asset_inventory.Countries);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Cancel() {
    this.router.navigate(["asset-inventory", "parts-master-main"])
  }

  AddPartsMaster(data: PartsMasterItem) {
    this.store.dispatch(new PartsMasterCreateAction(data));
  }

  EditPartsMaster(data: PartsMasterItem) {
    this.store.dispatch(new PartsMasterUpdateAction(data));
  }
}
