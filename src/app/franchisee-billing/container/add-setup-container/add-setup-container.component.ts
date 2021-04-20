import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AddSetupLoadAction, AddSetupAction } from 'src/app/store/actions/franchisee_billing.action';
import { Observable } from 'rxjs';
import { Franchisees, CreateFranchiseeSetup } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-add-setup-container',
  templateUrl: './add-setup-container.component.html',
  styleUrls: ['./add-setup-container.component.scss']
})
export class AddSetupContainerComponent implements OnInit {

  franchisee$: Observable<Franchisees[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AddSetupLoadAction());
    this.franchisee$ = this.store.select(state => state.franchisee_billing.franchisees);
    this.franchisee$.subscribe(
      data => {console.log(data)}
    )
  }

  cancel() {
    this.router.navigate(['franchisee-billing', 'bills-setup']);
  }

  add(data: CreateFranchiseeSetup) {
    console.log(data);
    this.store.dispatch(new AddSetupAction(data));
  }

}