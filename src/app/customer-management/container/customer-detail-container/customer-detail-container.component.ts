import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { CustomerDetailLoadAction } from 'src/app/store/actions/customer_management.action';
import { Observable } from 'rxjs';
import { SingleCustomerInDetail } from 'src/app/models/customerManagementModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail-container',
  templateUrl: './customer-detail-container.component.html',
  styleUrls: ['./customer-detail-container.component.scss']
})
export class CustomerDetailContainerComponent implements OnInit {

  private subs = new SubSink();
  singleCustomer$: Observable<SingleCustomerInDetail>;

  constructor(private router: Router,private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var customer_id = +params['id'];
      this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
        admn_user_id => {
          this.store.dispatch(new CustomerDetailLoadAction({ customer_id: customer_id, admn_user_id: admn_user_id }));
        }
      )
    }));

    this.singleCustomer$ = this.store.select(state => state.customer_management.SingleCustomer);
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
