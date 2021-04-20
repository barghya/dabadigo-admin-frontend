import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { EditPartLoadAction, EditPartAction } from 'src/app/store/actions/asset_inventory.action';
import { Observable } from 'rxjs';
import { parts, countries } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-edit-parts-container',
  templateUrl: './edit-parts-container.component.html',
  styleUrls: ['./edit-parts-container.component.scss']
})
export class EditPartsContainerComponent implements OnInit, OnDestroy {

  singlePart$: Observable<parts>;
  country$: Observable<countries[]>;
  vehiclePartState$: Observable<DomainData[]>;
  private subs = new SubSink();
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var part_id = +params['id'];
      this.store.dispatch(new EditPartLoadAction({
        vehicle_part_id: part_id
      }))
    }));
    this.singlePart$ = this.store.select(state => state.asset_inventory.singlePart)
    this.country$ = this.store.select(state => state.asset_inventory.Countries)
    this.vehiclePartState$ = this.store.select(state => state.asset_inventory.vehicle_parts_state)
  }
  editPart() {

  }

  partEditForm(value: parts) {
    console.log('edit user', value);
    this.store.dispatch(new EditPartAction(value))
  }
  
  cancelpart() {
    this.router.navigate(['asset-inventory', 'part-main'])
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
