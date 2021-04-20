import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { VehicleTypesLoadAction, PartsDefinitionLoadAction, PartsDefinitionUpdateAction } from 'src/app/store/actions/asset_inventory.action';
import { PartsDefinitionItem, PartsDefinitionUpdatePayload, PartsMasterItem } from 'src/app/models/asset-inventoryModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts-definition-container',
  templateUrl: './parts-definition-container.component.html',
  styleUrls: ['./parts-definition-container.component.scss']
})
export class PartsDefinitionContainerComponent implements OnInit {
  Vehicle_Types$: Observable<DomainData[]>;
  partsDefinitions$: Observable<PartsDefinitionItem[]>;
  partsMasterList$: Observable<PartsMasterItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new VehicleTypesLoadAction());
    this.Vehicle_Types$ = this.store.select(state => state.asset_inventory.Vehicle_Types);
    this.partsDefinitions$ = this.store.select(state => state.asset_inventory.partsDefinitions);
    this.partsMasterList$ = this.store.select(state => state.asset_inventory.partsMasterList);
  }

  VehicleTypeChange(vehicle_type_id: number) {
    this.store.dispatch(new PartsDefinitionLoadAction({
      vehicle_type_id: vehicle_type_id
    }));
  }

  PartsDefinitionUpdate(data: PartsDefinitionUpdatePayload) {
    console.log(data);
    this.store.dispatch(new PartsDefinitionUpdateAction(data));
  }

  Cancel() {
    this.router.navigate(["asset-inventory", "assets-main"])
  }

}
