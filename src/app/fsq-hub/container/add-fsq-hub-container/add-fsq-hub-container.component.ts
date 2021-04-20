import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { states, CityItem } from 'src/app/models/regionManagement';
import { managers, AddFSQHub, Region } from 'src/app/models/fsqhubModel';
import { AddFSQHubLoadAction, AddFSQHubAction } from 'src/app/store/actions/fsq_hub.action';
import { DomainData } from 'src/app/models/domainModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { region } from 'src/app/models/userManagement';

@Component({
  selector: 'app-add-fsq-hub-container',
  templateUrl: './add-fsq-hub-container.component.html',
  styleUrls: ['./add-fsq-hub-container.component.scss']
})
export class AddFsqHubContainerComponent implements OnInit {
  availableRegions$: Observable<Region[]>;
  availableManagers$: Observable<managers[]>; 
  countriesName$: Observable<countries[]>;
  statesName$: Observable<states[]>;
  HubstatusName$: Observable<DomainData[]>; 
  cities$: Observable<CityItem[]>;

  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddFSQHubLoadAction());
    this.availableRegions$ = this.store.select(state => state.fsq_hub.availableRegions);
    this.availableManagers$ = this.store.select(state => state.fsq_hub.availableManagers);  
    this.countriesName$ = this.store.select(state => state.fsq_hub.Countries);
    this.statesName$ = this.store.select(state => state.fsq_hub.States);
    this.HubstatusName$ = this.store.select(state => state.fsq_hub.hubstatus);
    this.cities$ = this.store.select(state => state.fsq_hub.cities);
  }
  cancelAddfsqHubevent(){
    this.router.navigate(['fsq-hub', 'fsq-hub']);
  }
  AddFSQHub(data: AddFSQHub) {
    this.store.dispatch(new AddFSQHubAction(data));
    console.log(data);
    
  }
  AddRegionEvent(){
    
  }
}
