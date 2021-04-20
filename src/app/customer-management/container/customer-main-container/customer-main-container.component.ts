import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { customerDetails, ActiveInactiveRequest } from 'src/app/models/customerManagementModel';
import { CustomerManagementListLoadAction, ActiveAction, InactiveAction } from 'src/app/store/actions/customer_management.action';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-main-container',
  templateUrl: './customer-main-container.component.html',
  styleUrls: ['./customer-main-container.component.scss']
})
export class CustomerMainContainerComponent implements OnInit {
 customerDetails$: Observable<customerDetails[]>

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new CustomerManagementListLoadAction(admn_user_id));
      }
    );
    this.customerDetails$ = this.store.select(state => state.customer_management.CustomerDetails);
  }

  Active(data: ActiveInactiveRequest){
    this.store.dispatch(new ActiveAction(data))
  }

  Inactive(data: ActiveInactiveRequest){
    this.store.dispatch(new InactiveAction(data))
  }
  
  ViewDetail(customer_id: number) {
    this.router.navigate(["customer-management", "customer-detail", customer_id]);
  }
}
