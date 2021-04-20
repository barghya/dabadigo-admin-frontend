import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FSQDetails, ApproveRequestFSQ } from 'src/app/models/fsqManagement';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { FSQManagementListLoadAction, ApproveRequestAction, FsqActiveInactiveAction } from 'src/app/store/actions/fsq_management.action';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fsq-request-management-container',
  templateUrl: './fsq-request-management-container.component.html',
  styleUrls: ['./fsq-request-management-container.component.scss']
})
export class FsqRequestManagementContainerComponent implements OnInit {
  fsqdetails$: Observable<FSQDetails[]>

  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    // this.store.dispatch(new FSQManagementListLoadAction());
    // this.fsqdetails$ = this.store.select(state => state.fsq_management.fsqdetails);
  
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new FSQManagementListLoadAction(admn_user_id));
      }
    );
    this.fsqdetails$ = this.store.select(state => state.fsq_management.fsqdetails);
  }

  verify(admn_user_id:number){
    this.router.navigate(['fsq-request-management', 'verify-document', admn_user_id])
    console.log(admn_user_id);
    
  }
  shiftManagement(){
    this.router.navigate(['fsq-request-management','shift-management']);
  }
  Active(data: number){
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new FsqActiveInactiveAction({active: true,admn_user_id: data,fsq_id:admn_user_id}))
      }
    );
  }
  Inactive(data: number){
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new FsqActiveInactiveAction({active: false,admn_user_id: data,fsq_id: admn_user_id}))
      }
    );
  }
  
}
