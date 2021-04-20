import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { VehicleRequestListLoadAction, DeleteDeployVehicleAction } from 'src/app/store/actions/deploy_vehicle.action';
import { Observable } from 'rxjs';
import { DeployRequestVehicle, deploymentRequestID } from 'src/app/models/deployVehicleModel';
import { tap } from 'rxjs/operators';
import { RegionItem, states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-deploy-vehicle-main-container',
  templateUrl: './deploy-vehicle-main-container.component.html',
  styleUrls: ['./deploy-vehicle-main-container.component.scss']
})
export class DeployVehicleMainContainerComponent implements OnInit {
  vehicleRequest$: Observable<DeployRequestVehicle[]>
  regions$: Observable<RegionItem[]>;
  city$: Observable<CityItem[]>;
  state$: Observable<states[]>;
  constructor(private router: Router,private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new VehicleRequestListLoadAction());
    this.vehicleRequest$ = this.store.select(state=> state.deploy_vehicle.deployRequestVehicle); 
    this.regions$ = this.store.select(state => state.deploy_vehicle.RegionList);
    this.state$ = this.store.select(state => state.deploy_vehicle.StateList);
    this.city$ = this.store.select(state => state.deploy_vehicle.CityList);
    console.log(this.vehicleRequest$);
  }
  addRequestEvent(){
    this.router.navigate(['deploy-vehicle','add-deploy-request']);
  }

  deployvehicle(deployment_request_id:number){
    this.router.navigate(['deploy-vehicle', 'deploy-vehicle-action', deployment_request_id]);
  }

  canceldeployvehicle(value: deploymentRequestID){
    this.store.dispatch(new DeleteDeployVehicleAction(value));
    console.log(value);
  }

  View(deployment_request_id: number) {
    this.router.navigate(['deploy-vehicle', 'deploy-vehicle-action', deployment_request_id]);
  }
}
