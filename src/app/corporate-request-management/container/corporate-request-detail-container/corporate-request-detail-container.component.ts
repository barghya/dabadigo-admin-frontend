import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { CorporateRequestDetailLoad, ApproveRequestAction, RejectRequestAction } from 'src/app/store/actions/corporate_request_management.action';
import { Observable } from 'rxjs';
import { CorporateRequestDetail } from 'src/app/models/corporateRequestManagementModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-corporate-request-detail-container',
  templateUrl: './corporate-request-detail-container.component.html',
  styleUrls: ['./corporate-request-detail-container.component.scss']
})
export class CorporateRequestDetailContainerComponent implements OnInit {

  private subs = new SubSink();
  requestDetail$: Observable<CorporateRequestDetail>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var corporate_customer_id = +params['id'];
      this.store.dispatch(new CorporateRequestDetailLoad(corporate_customer_id));
    }));

    this.requestDetail$ = this.store.select(state => state.corporate_request_management.singleCorporateRequest);
  }

  Approve(corporate_cusotmer_id: number) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new ApproveRequestAction({
          admn_user_id: admn_user_id,
          corporate_customer_id: corporate_cusotmer_id
        }))
      }
    )
  }

  Reject(corporate_cusotmer_id: number) {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new RejectRequestAction({
          admn_user_id: admn_user_id,
          corporate_customer_id: corporate_cusotmer_id
        }))
      }
    )
  }

}
