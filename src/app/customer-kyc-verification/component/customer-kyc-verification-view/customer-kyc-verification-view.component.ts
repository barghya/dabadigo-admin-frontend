import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { SingleCustomerInDetail, customerkycUrl, ApproveRequest } from 'src/app/models/customerKycVerificationModel';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-kyc-verification-view',
  templateUrl: './customer-kyc-verification-view.component.html',
  styleUrls: ['./customer-kyc-verification-view.component.scss']
})
export class CustomerKycVerificationViewComponent implements OnInit, OnDestroy {
  @Input() singleCustomer$: Observable<SingleCustomerInDetail>;
  @Input() docurl$: Observable<customerkycUrl[]>;
  @Output() Approve = new EventEmitter();
  private subs = new SubSink();

  constructor(public languageService: LanguageService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  approve() {
    this.singleCustomer$.pipe(take(1)).subscribe(
      customer => {
        var data: ApproveRequest = {
          customer_id: customer.customer_details.customer_id
        }
        this.Approve.emit(data);
        console.log(data);
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
