import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { ViewFranchiseePaymentDetails, PaymentDetail, PenaltyMaintain, Paymentpenalty } from 'src/app/models/franchiseeBillingModel';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-franchise-bill-details',
  templateUrl: './franchise-bill-details.component.html',
  styleUrls: ['./franchise-bill-details.component.scss']
})
export class FranchiseBillDetailsComponent implements OnInit {

  @Input() paymentDetails$: Observable<ViewFranchiseePaymentDetails>;

  dataSourceofPayments: MatTableDataSource<PaymentDetail>;
  dataSourceofPenalties: MatTableDataSource<Paymentpenalty>;

  displayedColumnsofPaymentsDetails: string[] = ['entry_date', 'rentalpoint_name', 'vehicle_number', 'rent_type_name', 'payable_amount'];
  displayedColumnsofPenaltyDetails: string[] = ['descriptions', 'penalty_amount'];

  @ViewChild("paymentSort", {static: true}) paymentSort: MatSort;
  @ViewChild("penaltySort", {static: true}) penaltySort: MatSort;

  paymentDetails: ViewFranchiseePaymentDetails;
  penalties: Paymentpenalty[] = [];

  private subs = new SubSink();

  constructor( public languageService: LanguageService ) { }

  ngOnInit() {
    this.subs.add(this.paymentDetails$.subscribe(
      paymentDetails => {
        if(!!paymentDetails) {
          this.paymentDetails = JSON.parse(JSON.stringify(paymentDetails));
          this.penalties = JSON.parse(JSON.stringify(paymentDetails.payment_penalty));
          this.dataSourceofPayments = new MatTableDataSource<PaymentDetail>(this.paymentDetails.payment_details);
          this.dataSourceofPayments.sort = this.paymentSort;
          this.dataSourceofPenalties = new MatTableDataSource<Paymentpenalty>(this.penalties);
          this.dataSourceofPenalties.sort = this.penaltySort;
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}