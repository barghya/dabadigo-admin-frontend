import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectVehiclePopoverContainerComponent } from '../select-vehicle-popover-container/select-vehicle-popover-container.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AddDeployVehicleLoad, AddRequestVehicleAction } from 'src/app/store/actions/deploy_vehicle.action';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { users } from 'src/app/models/userManagement';
import { GetRp } from 'src/app/models/rentalPoint';
import { VehicleDetails, DeployRequestVehicle } from 'src/app/models/deployVehicleModel';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-deploy-request-container',
  templateUrl: './add-deploy-request-container.component.html',
  styleUrls: ['./add-deploy-request-container.component.scss']
})
export class AddDeployRequestContainerComponent implements OnInit {

  region$: Observable<RegionItem[]>;
  user$: Observable<users[]>;
  rentalPoint$: Observable<GetRp[]>
  deployVehicle: VehicleDetails[];
  private subs = new SubSink();
  constructor(public dialog: MatDialog, private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new AddDeployVehicleLoad(admn_user_id));
      }
    );
    this.region$= this.store.select(state=>state.deploy_vehicle.region);
    this.rentalPoint$= this.store.select(state => state.deploy_vehicle.rentalPoint);
    this.user$= this.store.select(state=> state.deploy_vehicle.users).pipe(map(
      users => users.filter(m => m.user_type == 1 && m.user_status == 3)
    ));
  }
  selectVehicleEvent(value){
    console.log('add button',value);
    if (!value) {
      var dialogRef = this.dialog.open(SelectVehiclePopoverContainerComponent,
        {
          width: '90%',
          disableClose: true,
        });
    } else {
      var dialogRef = this.dialog.open(SelectVehiclePopoverContainerComponent,
        {
          width: '90%',
          disableClose: true,
          data: value
        }); 
    }
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('from container', result);
        this.deployVehicle = [...result];
      }
    });
  }
  emitRequestVehicle(data:DeployRequestVehicle){
    this.store.dispatch(new AddRequestVehicleAction(data));
    console.log(data);
  }
  cancelDeployRequest(){
    this.router.navigate(['deploy-vehicle', 'deploy-vehicle-main'])
  }
}
