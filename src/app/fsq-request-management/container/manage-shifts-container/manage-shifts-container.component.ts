import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';
import { FSQDetails, createShiftService, FsqShift, FSQShiftManagementId, FsqShifts, startShiftService, EndShiftService, PauseShiftService, Breakpoint } from 'src/app/models/fsqManagement';
import { Observable } from 'rxjs';
import { GetAllRegionAction, AddFsqShiftAction, GetAllShiftAction, DeleteFSQShiftAction, GetFSQTagedRegionAction, FsqStartShiftAction, FsqEndShiftAction, FsqPauseShiftAction, FsqResumeShiftAction, FsqRentalpointLoadAction } from 'src/app/store/actions/fsq_management.action';
import { RegionItem } from 'src/app/models/regionManagement';
import { Router } from '@angular/router';
import { GetRp } from 'src/app/models/rentalPoint';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { BreakPoint } from '@angular/flex-layout';


@Component({
  selector: 'app-manage-shifts-container',
  templateUrl: './manage-shifts-container.component.html',
  styleUrls: ['./manage-shifts-container.component.scss']
})
export class ManageShiftsContainerComponent implements OnInit {
  fsqDetail$: Observable<FSQDetails[]>;
  fsqRegion$: Observable<RegionItem[]>;
  breakPoint$: Observable<Breakpoint>;
  createShiftService: createShiftService;
  AllShift$: Observable<FsqShifts>;
  startShiftService: startShiftService;
  PauseShiftService: PauseShiftService;
  EndShiftService: EndShiftService;
  rentalPointList$?: Observable<GetRp[]>;
 
 
  constructor(private store: Store<AppState>, private router: Router,private rentalpointservice:RentalPointService) { }


  ngOnInit() {
    this.store.dispatch(new GetAllShiftAction());
    this.fsqRegion$= this.store.select(state=>state.fsq_management.FsqShiftRegion);
    this.AllShift$= this.store.select(state=> state.fsq_management.FsqShift);
    this.breakPoint$= this.store.select(state=> state.fsq_management.breakPoint);
    this.rentalPointList$ = this.store.select(state => state.fsq_management.rentalPointList);
  }
  AddShiftEvent(data: createShiftService){
    this.store.select(state=>state.user.userdetail).pipe(take(1)).subscribe(
      userdetail=>{
        data.created_by=userdetail.admn_user_id;
        this.store.dispatch(new AddFsqShiftAction(data));
      }
    )
    console.log(data);
  }
  FsqShiftDelete(value: FSQShiftManagementId){
    this.store.dispatch(new DeleteFSQShiftAction(value))
  }
  getRegion(value: number){
    this.store.dispatch(new GetFSQTagedRegionAction({admn_user_id: value}))
    console.log(value);
  }
  RegionSelected(region_id: number) {
    this.store.dispatch(new FsqRentalpointLoadAction({region_id:region_id}));
    console.log(region_id)
  }
  ShiftEdit(fsq_shift_management_id:number) {
    this.router.navigate(['fsq-request-management', 'edit-shift-management', fsq_shift_management_id]);
  }
  AssignVehicleEvent(data: any){
    console.log(data);
    
    this.router.navigate(['fsq-request-management', 'assign-vehicle', data.id ,data.path]);
  }
  StartShiftEvent(element: FsqShift){
    this.startShiftService={
      admin_flag: 1,
      admn_user_id: element.fsq_id,
      fsq_shift_management_id: element.fsq_shift_management_id,
      latitude: null,
      longitude: null,
      region_id: element.region_id
    }
    this.store.dispatch(new FsqStartShiftAction(this.startShiftService))
  }
  PauseShiftEvent(element: FsqShift){
    this.PauseShiftService= {
      admin_flag: 1,
      fsq_id: element.fsq_id,
      fsq_shift_management_id: element.fsq_shift_management_id,
      latitude: null,
      longitude: null
    }
   this.store.dispatch(new FsqPauseShiftAction(this.PauseShiftService))
  }
  ResumeShiftEvent(element: FsqShift){
    this.PauseShiftService= {
      admin_flag: 1,
      fsq_id: element.fsq_id,
      fsq_shift_management_id: element.fsq_shift_management_id,
      latitude: null,
      longitude: null
    }
   this.store.dispatch(new FsqResumeShiftAction(this.PauseShiftService))
  }
  EndShiftEvent(element: FsqShift){
    this.EndShiftService= {
      admin_flag: 1,
      fsq_id: element.fsq_id,
      fsq_shift_management_id: element.fsq_shift_management_id,
      latitude: null,
      longitude: null
    }
    this.store.dispatch(new FsqEndShiftAction(this.EndShiftService))
  }
  
}
