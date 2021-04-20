import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { CorporateRequestManagementLoadAction } from 'src/app/store/actions/corporate_request_management.action';
import { pendingRequest } from 'src/app/models/corporateRequestManagementModel';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corporate-request-management-main-container',
  templateUrl: './corporate-request-management-main-container.component.html',
  styleUrls: ['./corporate-request-management-main-container.component.scss']
})
export class CorporateRequestManagementMainContainerComponent implements OnInit,OnDestroy{
  getCorporateRequest$: Observable<pendingRequest[]>;
  private subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new CorporateRequestManagementLoadAction({admn_user_id: admn_user_id, past_flag: false }));
      }
    );
    this.getCorporateRequest$ = this.store.select(state => state.corporate_request_management.CorporateRequestList);
    console.log(this.getCorporateRequest$);
    console.log("abc");
    
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
  View(corporate_customer_id: number){
    this.router.navigate(["corporate-request-management", "corporate-request-detail", corporate_customer_id]);
  }  

  ShowHidePastData(data: boolean) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new CorporateRequestManagementLoadAction({admn_user_id: admn_user_id, past_flag: data }));
      }
    );
  }
}
