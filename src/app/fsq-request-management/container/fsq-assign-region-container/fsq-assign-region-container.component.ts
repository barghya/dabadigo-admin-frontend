import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RegionItem } from 'src/app/models/regionManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { FSQRegionLoad, UpdateRegionAction } from 'src/app/store/actions/fsq_management.action';
import { SubSink } from 'subsink';
import { FSQDetails, FSQRegionUpdate } from 'src/app/models/fsqManagement';

@Component({
  selector: 'app-fsq-assign-region-container',
  templateUrl: './fsq-assign-region-container.component.html',
  styleUrls: ['./fsq-assign-region-container.component.scss']
})
export class FsqAssignRegionContainerComponent implements OnInit, OnDestroy{
  fsqassignRegion$: Observable<RegionItem[]>
  singleFSQ$: Observable<FSQDetails>
  private subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var region_id = +params['id'];
      this.store.dispatch(new FSQRegionLoad({
        admn_user_id: region_id
      }))
    }))
    this.fsqassignRegion$ = this.store.select(state => state.fsq_management.regionItem);
    this.singleFSQ$ = this.store.select(state => state.fsq_management.singleFSQ)
  }

  cancelFSQRegion(){
    this.router.navigate(['fsq-request-management' , 'fsq-request-management'])
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  FSQassignRegionForm(value: FSQRegionUpdate){
    console.log('Update Region', value);
    this.store.dispatch(new UpdateRegionAction(value))
  }
  
}
