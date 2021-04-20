import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ViewFranchiseePaymentDetails, PaymentDetail, Paymentpenalty, PenaltyMaintain, generatePenaltyService } from 'src/app/models/franchiseeBillingModel';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { SubSink } from 'subsink';
import { AddPenaltyContainerComponent } from '../../container/add-penalty-container/add-penalty-container.component';
import { EditPenaltyContainerComponent } from '../../container/edit-penalty-container/edit-penalty-container.component';
import { ConfirmationPopoverComponent } from '../confirmation-popover/confirmation-popover.component';

@Component({
  selector: 'app-view-payment-details',
  templateUrl: './view-payment-details.component.html',
  styleUrls: ['./view-payment-details.component.scss']
})
export class ViewPaymentDetailsComponent implements OnInit {

  @Input() paymentDetails$: Observable<ViewFranchiseePaymentDetails>;

  displayedColumnsofPaymentsDetails: string[] = ['entry_date', 'rentalpoint_name', 'vehicle_number', 'rent_type_name', 'payable_amount'];
  displayedColumnsofPenaltyDetails: string[] = ['descriptions', 'penalty_amount', 'actions'];

  dataSourceofPayments: MatTableDataSource<PaymentDetail>;
  dataSourceofPenalties: MatTableDataSource<PenaltyMaintain>;

  @ViewChild("paymentSort", {static: true}) paymentSort: MatSort;
  @ViewChild("penaltySort", {static: true}) penaltySort: MatSort;

  @Output() paymentDoneEvent = new EventEmitter();
  @Output() savePenaltiesEvent = new EventEmitter<generatePenaltyService>();

  private subs = new SubSink();

  paymentDetails: ViewFranchiseePaymentDetails;
  penalties: PenaltyMaintain[] = [];

  sumofPenalty: number = 0;
  final_amount_payable: number = 0;

  payment_done_flag: boolean = false;
  save_button_enable_flag:boolean = false;

  constructor( public languageService: LanguageService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.save_button_enable_flag = false;
    this.subs.add(this.paymentDetails$.subscribe(
      paymentDetails => {
        if(!!paymentDetails) {
          this.penalties = [];
          this.paymentDetails = JSON.parse(JSON.stringify(paymentDetails));
          this.penalties = JSON.parse(JSON.stringify(paymentDetails.payment_penalty));
          this.dataSourceofPayments = new MatTableDataSource<PaymentDetail>(this.paymentDetails.payment_details);
          this.dataSourceofPayments.sort = this.paymentSort;
          this.dataSourceofPenalties = new MatTableDataSource<PenaltyMaintain>(this.penalties);
          this.dataSourceofPenalties.sort = this.penaltySort;
          this.penalties.forEach((m, index)=> m.id= index);
          console.log( this.penalties);
          this.penalties.forEach(element => {
            this.sumofPenalty = this.sumofPenalty + element.penalty_amount;
          })
          //this.final_amount_payable = this.sumofPenalty + this.paymentDetails.amount_to_pay;
          this.final_amount_payable = this.paymentDetails.amount_to_pay - this.sumofPenalty;
          console.log("final amount payable from oninit", this.final_amount_payable);
        }
      }
    ))
  }

  addPenalty() {
    var dialogRef = this.dialog.open(AddPenaltyContainerComponent,
      {
        width: '80%',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!!result) {
          this.sumofPenalty = 0;
          this.save_button_enable_flag = true;
          this.penalties.push({
            descriptions: result.descriptions,
            penalty_amount: result.penalty_amount,
            id: this.penalties.length
          });
          console.log(this.penalties);
          //this.dataSourceofPenalties = new MatTableDataSource<PenaltyMaintain>(this.penalties);
          this.dataSourceofPenalties.sort = this.penaltySort;
          this.penalties.forEach(element => {
            this.sumofPenalty = this.sumofPenalty + element.penalty_amount;
          })
          console.log(this.sumofPenalty);
          this.sumofPenalty = this.paymentDetails.amount_to_pay - this.sumofPenalty;
          console.log("from add", this.sumofPenalty);
        }
      })
  }

  edit(value: PenaltyMaintain) {
    if(!!value) {
      console.log(value);
      var dialogRef = this.dialog.open(EditPenaltyContainerComponent,
      {
        width: '80%',
        disableClose: true,
        data: value
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!!result) {
          this.sumofPenalty = 0;
          this.save_button_enable_flag = true;
          this.penalties[this.penalties.findIndex(i => i.id == result.id)] = {
            descriptions: result.descriptions,
            penalty_amount: result.penalty_amount,
            id: this.penalties.length
          }
          //this.dataSourceofPenalties = new MatTableDataSource<PenaltyMaintain>(this.penalties);
          this.dataSourceofPenalties.sort = this.penaltySort;
          console.log(this.penalties);
          this.penalties.forEach(element => {
            this.sumofPenalty = this.sumofPenalty + element.penalty_amount;
          })
          console.log(this.sumofPenalty);
          this.sumofPenalty = this.paymentDetails.amount_to_pay - this.sumofPenalty;
          console.log("from edit", this.sumofPenalty);
        }
      })
    }
  }

  delete(value: PenaltyMaintain) {
    if(!!value) {
      this.sumofPenalty = 0;
      this.save_button_enable_flag = true;
      this.penalties = this.penalties.filter(m => m.id != value.id);
      this.dataSourceofPenalties = new MatTableDataSource<PenaltyMaintain>(this.penalties);
      this.dataSourceofPenalties.sort = this.penaltySort;
      this.penalties.forEach(element => {
        this.sumofPenalty = this.sumofPenalty + element.penalty_amount;
      })
      console.log(this.sumofPenalty);
      this.sumofPenalty = this.paymentDetails.amount_to_pay - this.sumofPenalty;
      console.log("from delete", this.sumofPenalty);
    }
  }

  paymentStatus(franchise_payment_id: number) {
    var dialog = this.dialog.open(ConfirmationPopoverComponent,
      {
        maxWidth: '50%',
        data: {
          title: "Confirmation Message",
          message: "On clicking YES you will acknowledge the payment to the Franchise"
        }
      }  
    );
    dialog.afterClosed().subscribe(
      result => {
        console.log(result);
        if(result == true) {
          this.payment_done_flag = true;
          this.paymentDoneEvent.emit(franchise_payment_id);
        } else {
          this.payment_done_flag = false;
        }
      }
    )
  }

  save() {
    var penalty: PenaltyMaintain[] = [];
    this.penalties.forEach(m => {penalty.push({
      descriptions: m.descriptions,
      penalty_amount: m.penalty_amount,
    })})
    var formData: generatePenaltyService = {
      penalty: penalty,
      final_amount_payable: this.sumofPenalty,
    }
    console.log(formData);
    this.savePenaltiesEvent.emit(formData);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}