import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SendEmailLoadAction, BillingSendEmailAction } from 'src/app/store/actions/corporate_billing.action';
import { Observable } from 'rxjs';
import { EmailDetails, SendEmailModel } from 'src/app/models/corporateBillingModel';

@Component({
  selector: 'app-send-email-container',
  templateUrl: './send-email-container.component.html',
  styleUrls: ['./send-email-container.component.scss']
})
export class SendEmailContainerComponent implements OnInit {

  private subs = new SubSink();
  emailDetails$: Observable<EmailDetails>;

  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(
      params => {
        var corporate_billing_id = +params['id'];
        if(!!corporate_billing_id) {
          console.log("from send-email container", corporate_billing_id);
          this.store.dispatch(new SendEmailLoadAction(corporate_billing_id));
        }
    }));
    this.emailDetails$ = this.store.select(state => state.corporate_billing.emailDetails);
  }

  cancel() {
    this.router.navigate(['corporate-billing', 'corporate-bills']);
  }

  sendEmail(value: SendEmailModel) {
    this.subs.add(this.route.params.subscribe(
      data => {
        var corporate_billing_id = +data['id'];
        value.corporate_billing_id = corporate_billing_id;
        console.log(value);
        this.store.dispatch(new BillingSendEmailAction(value));
      } 
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
