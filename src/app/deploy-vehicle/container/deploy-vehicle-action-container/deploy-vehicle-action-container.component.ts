import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DeployVehicleLoadAction, DeployvehicleAction } from 'src/app/store/actions/deploy_vehicle.action';
import { Observable } from 'rxjs';
import { DeployRequestVehicle } from 'src/app/models/deployVehicleModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-deploy-vehicle-action-container',
  templateUrl: './deploy-vehicle-action-container.component.html',
  styleUrls: ['./deploy-vehicle-action-container.component.scss']
})
export class DeployVehicleActionContainerComponent implements OnInit, OnDestroy{
  getVehicle$: Observable<any>
  private subs = new SubSink();
  constructor(private route: ActivatedRoute, private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var deployment_req_id: number = +params['id'];
      console.log('action',deployment_req_id);
      this.store.dispatch(new DeployVehicleLoadAction({
        deployment_request_id:deployment_req_id
      }))
    }));
    this.getVehicle$ = this.store.select(state => state.deploy_vehicle.singleDeployVehicle)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  requestDeployVehicle(data:DeployRequestVehicle){
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        data.admn_user_id = admn_user_id;
        this.store.dispatch(new DeployvehicleAction(data));
      }
    )
    console.log(data);
  }

  cancelDeployRequestVehicle(){
    this.router.navigate(['deploy-vehicle', 'deploy-vehicle-main'])
  }
}

