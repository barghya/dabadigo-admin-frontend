import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialogRef } from '@angular/material';
import { customerDetails } from 'src/app/models/customerManagementModel';
import { Observable } from 'rxjs';
import { AssignCouponCustomerLoadAction } from 'src/app/store/actions/coupon_management.action';

@Component({
  selector: 'app-coupon-customer-search',
  templateUrl: './coupon-customer-search.component.html',
  styleUrls: ['./coupon-customer-search.component.scss']
})
export class CouponCustomerSearchComponent implements OnInit {
  customers$: Observable<customerDetails[]>;
  displayedColumns: string[] = ["first_name", "last_name", "phone_no", "email_id"]
  headers = { 
    "first_name": this.languageService.getText("firstNameText"),
    "last_name": this.languageService.getText("lastNameText"),
    "phone_no": this.languageService.getText("phoneNumberText"),
    "email_id": this.languageService.getText("emailIDText")
  }

  constructor(private store: Store<AppState>, private languageService: LanguageService, public dialogRef: MatDialogRef<CouponCustomerSearchComponent>) { }

  ngOnInit() {
    this.customers$ = this.store.select(state => state.coupon_management.customers);
  }

  Search(search_string: string) {
    this.store.dispatch(new AssignCouponCustomerLoadAction(search_string));
  }

  Cancel() {
    this.dialogRef.close();
  }

  CustomerSelected(data: customerDetails) {
    this.dialogRef.close(data);
  }

}
