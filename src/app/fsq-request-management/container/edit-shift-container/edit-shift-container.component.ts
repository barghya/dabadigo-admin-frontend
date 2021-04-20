import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { FsqShift, editShiftService } from 'src/app/models/fsqManagement';
import { SubSink } from 'subsink';
import { GetAllShiftAction, GetFSQTagedRegionAction, EditShiftAction, FsqRentalpointLoadAction, GetFsqShiftRegionRentalPointAction } from 'src/app/store/actions/fsq_management.action';
import { map, tap } from 'rxjs/operators';
import { GetRp } from 'src/app/models/rentalPoint';

@Component({
  selector: 'app-edit-shift-container',
  templateUrl: './edit-shift-container.component.html',
  styleUrls: ['./edit-shift-container.component.scss']
})
export class EditShiftContainerComponent implements OnInit {
  fsqRegion$: Observable<RegionItem[]>;
  singleshift$: Observable<FsqShift>;
  regionId: number;
  rentalPointList$?: Observable<GetRp[]>;
  private subs = new SubSink();

  constructor(private router: Router, private store: Store<AppState>,private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var fsq_shift_management_id = +params['id'];
      this.singleshift$ = this.store.select(state=>state.fsq_management.FsqShift.current).pipe(map(e=>e.find(m=>m.fsq_shift_management_id==fsq_shift_management_id)),tap(
        data=>{
          this.store.dispatch(new GetFSQTagedRegionAction({admn_user_id: data.fsq_id}))
          this.store.dispatch(new GetFsqShiftRegionRentalPointAction({fsq_shift_management_id:fsq_shift_management_id}));
        }
      ));
    }));
    this.fsqRegion$ = this.store.select(state=>state.fsq_management.FsqShiftRegion);
    this.rentalPointList$ = this.store.select(state => state.fsq_management.shiftRegionRentalPoint);
  }

  RegionSelected(region_id: number) {
    this.store.dispatch(new FsqRentalpointLoadAction({region_id:region_id}));
    console.log(region_id)
  }

  cancelshift(){
    this.router.navigate(['fsq-request-management', 'shift-management'])
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  EditShiftData(data: editShiftService){
    this.store.dispatch(new EditShiftAction(data));
    console.log(data);
  }
}
