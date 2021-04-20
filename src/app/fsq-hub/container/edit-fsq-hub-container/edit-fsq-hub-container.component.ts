import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';
import { managers, AddFSQHub, editFSQHub, HubRegion, hubregion, hubmanager } from 'src/app/models/fsqhubModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { region } from 'src/app/models/userManagement';
import { EditFSQHubLoadAction, EditFSQHubAction, RemoveRegionAction, RemoveManagerAction } from 'src/app/store/actions/fsq_hub.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-edit-fsq-hub-container',
  templateUrl: './edit-fsq-hub-container.component.html',
  styleUrls: ['./edit-fsq-hub-container.component.scss']
})
export class EditFsqHubContainerComponent implements OnInit {
  availableRegions$: Observable<HubRegion[]>;
  availableManagers$: Observable<managers[]>; 
  countriesName$: Observable<countries[]>;
  statesName$: Observable<states[]>;
  HubstatusName$: Observable<DomainData[]>; 
  singleFSQHub$: Observable<editFSQHub>;
  cities$: Observable<CityItem[]>;
  subs = new SubSink();
  constructor(private store: Store<AppState>,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var hub_id = +params['id'];
      this.store.dispatch(new EditFSQHubLoadAction({
        hub_id: hub_id
      }))
    }));
    
    this.availableRegions$ = this.store.select(state => state.fsq_hub.availableRegions);
    this.availableManagers$ = this.store.select(state => state.fsq_hub.availableManagers);  
    this.countriesName$ = this.store.select(state => state.fsq_hub.Countries);
    this.statesName$ = this.store.select(state => state.fsq_hub.States); 
    this.HubstatusName$ = this.store.select(state => state.fsq_hub.hubstatus);
    this.singleFSQHub$ = this.store.select(state => state.fsq_hub.SingleHub);
    this.cities$ = this.store.select(state => state.fsq_hub.cities);
  }
  cancelAddfsqHubevent(){
    this.router.navigate(['fsq-hub', 'fsq-hub']);
  }
  EditFSQHub(value: AddFSQHub){
    this.store.dispatch(new EditFSQHubAction(value));
  }
  RemoveRegionHubevent(value:hubregion){
    console.log("Delete Region", value);
     this.store.dispatch(new RemoveRegionAction(value));
  }
  RemoveManagerHubevent(value:hubmanager){
    console.log("Delete Manager", value);
     this.store.dispatch(new RemoveManagerAction(value));
  }
  
}
