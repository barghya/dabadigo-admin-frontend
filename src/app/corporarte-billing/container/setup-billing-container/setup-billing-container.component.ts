import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporateDetails, CreateBillSetupModel } from 'src/app/models/corporateBillingModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SetupBillsLoadAction, CreateSetupbillingAction } from 'src/app/store/actions/corporate_billing.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-billing-container',
  templateUrl: './setup-billing-container.component.html',
  styleUrls: ['./setup-billing-container.component.scss']
})
export class SetupBillingContainerComponent implements OnInit {

  formData: CreateBillSetupModel;
  legalEntities$: Observable<CorporateDetails[]>;
  Corporates$: Observable<CorporateDetails[]>;

  constructor(private store: Store<AppState>, public router: Router) { }

  ngOnInit() {
    this.store.dispatch(new SetupBillsLoadAction());
    this.legalEntities$ = this.store.select( state => state.corporate_billing.legalEntityDetails );
    this.Corporates$ = this.store.select( state => state.corporate_billing.corporateDetails );
  }

  addSetupBill(data: CreateBillSetupModel) {
    this.formData = data;
    console.log(this.formData);
    this.store.dispatch(new CreateSetupbillingAction(data));
  }

  cancel() {
    this.router.navigate(['corporate-billing', 'bills-set-up'], {replaceUrl: true});
  }

}
