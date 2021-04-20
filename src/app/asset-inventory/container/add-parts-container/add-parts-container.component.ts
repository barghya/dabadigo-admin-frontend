import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { countries, AddParts, parts } from 'src/app/models/asset-inventoryModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { PartLoad, AddPartAction, AddAnotherPartsAction } from 'src/app/store/actions/asset_inventory.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parts-container',
  templateUrl: './add-parts-container.component.html',
  styleUrls: ['./add-parts-container.component.scss']
})
export class AddPartsContainerComponent implements OnInit {
  countryName$: Observable<countries[]>
  vehiclePartState$: Observable<DomainData[]>
  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new PartLoad());
    this.countryName$ = this.store.select(state => state.asset_inventory.Countries);
    this.vehiclePartState$ = this.store.select(state => state.asset_inventory.vehicle_parts_state)
  }

  partForm(value:AddParts){
    this.store.dispatch(new AddPartAction(value));
  }

  addAnotherParts(value:AddParts){
    this.store.dispatch(new AddAnotherPartsAction(value))
  }
  
  cancelParts(){
    this.router.navigate(['asset-inventory' , 'part-main'])
  }
  
}
