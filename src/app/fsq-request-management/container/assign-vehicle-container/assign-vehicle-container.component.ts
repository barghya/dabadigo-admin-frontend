import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { find, take } from 'rxjs/operators';
import { FsqShift, RentalPoint, vehicle, BookVehicleService, Job, VehicleDetail, FsqReturnVehicleService } from 'src/app/models/fsqManagement';
import { GetFsqShiftRegionRentalPointAction, GetAllVehicleLoadAction, BookvehicleAction, GetAssignvehicleAction, StartJobAction, FSQReturnVehicleAction, GetFSQTagedRegionAction, GetFsqRegionByCityAction, FsqRentalpointLoadAction, GetAllRentalPointLoadAction } from 'src/app/store/actions/fsq_management.action';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ReturnVehiclePopoverContainerComponent } from '../return-vehicle-popover-container/return-vehicle-popover-container.component';
import { RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-assign-vehicle-container',
  templateUrl: './assign-vehicle-container.component.html',
  styleUrls: ['./assign-vehicle-container.component.scss']
})
export class AssignVehicleContainerComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  shift : FsqShift;
  vehicle$: Observable<vehicle[]>;
  fsqRegion$: Observable<RegionItem[]>;
  ShiftRegion$: Observable<RentalPoint[]>;
  fsq_shift_management_id: number;
 
  path: number;
  vehicle_assignment_status:number;
  constructor(private router: Router, private store: Store<AppState>,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      this.fsq_shift_management_id = +params['id'];
      this.path = +params['path'];
      console.log(this.path);
      this.subs.add(this.store.select(state=> state.fsq_management.FsqShift).subscribe(
        data=>{
          if(!!data){
            console.log(data);
            console.log("call again");
            if(this.path== 0){
          
              this.shift= data.current.find(m=> m.fsq_shift_management_id== this.fsq_shift_management_id);
            
              console.log(this.shift);
            if(this.shift.vehicle_assignment_status == 0){
              this.store.dispatch(new GetFsqRegionByCityAction({city_id: this.shift.city_id}));
              // this.store.dispatch(new GetFsqShiftRegionRentalPointAction({fsq_shift_management_id: this.shift.fsq_shift_management_id}));
              }
            }else{
              this.shift= data.past.find(m=> m.fsq_shift_management_id== this.fsq_shift_management_id);
            }
            // this.store.dispatch(new GetFsqShiftRegionRentalPointAction({fsq_shift_management_id: this.shift.fsq_shift_management_id}));
            this.store.dispatch(new GetAssignvehicleAction({fsq_shift_management_id: this.shift.fsq_shift_management_id}));
          }
        }
      ))
    }));
    this.fsqRegion$= this.store.select(state=>state.fsq_management.FsqShiftRegion);
    this.ShiftRegion$= this.store.select(state=> state.fsq_management.shiftRegionRentalPoint);
    this.vehicle$= this.store.select(state=> state.fsq_management.VehicleByRentalPoint)
  }


  getRentalPointEvent(region_id:number){
    this.store.dispatch(new GetAllRentalPointLoadAction({region_id:region_id}))
    // this.store.dispatch(new FsqRentalpointLoadAction({region_id:region_id}))
  }
  getVehicleEvent(rentalpoint_id: number){
    this.store.dispatch(new GetAllVehicleLoadAction({rentalpoint_id:rentalpoint_id}))
  }
  cancelbutton(){
    this.router.navigate(['fsq-request-management' , 'shift-management'])
  }
  SubmitData(data: BookVehicleService){
    this.store.select(state=> state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      adminUserId=>{
        data.admn_user_id=adminUserId;
        data.fsq_shift_management_id= this.shift.fsq_shift_management_id;
        console.log(data);
        this.store.dispatch(new BookvehicleAction(data));
      }
    )
  }
  startJobEvent(element: Job){
    this.store.dispatch(new StartJobAction({admin_flag: true,fsq_id: element.fsq_id, latitude: null, 
      longitude: null,fsq_shift_management_id: this.fsq_shift_management_id}))
  }
  VehicleReturn(element: VehicleDetail){
    this.store.select(state=> state.fsq_management.shift_detail).pipe(take(1)).subscribe(
      data=>{
        if(element.status ==1 && element.vehicle_current_status == 3 ){
          var SendData: FsqReturnVehicleService ={
            fsq_vehicle_association_id: element.fsq_vehicle_association_id,
            fsq_shift_management_id: this.fsq_shift_management_id,
            rentalpoint_id: null
          }
          this.store.dispatch(new FSQReturnVehicleAction(SendData));
        }else if(element.status==2 && element.vehicle_current_status== 4){
          var value ={
            id: this.fsq_shift_management_id,
            region_id: data.region_id,
            fsq_vehicle_association_id: element.fsq_vehicle_association_id,
          }
          var dialogRef = this.dialog.open(ReturnVehiclePopoverContainerComponent,
            {
              width: '90%',
              disableClose: true,
              data: value
            }); 
        }
      }
    )
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
