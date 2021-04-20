import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { TripDetailsModel, BillDetailsModel, Adjustments, generateAdjustmentService, AdjustmentsMaintain } from 'src/app/models/corporateBillingModel';
import { SubSink } from 'subsink';
import { AddAdjustmentFormContainerComponent } from '../../container/add-adjustment-form-container/add-adjustment-form-container.component';
import { EditAdjustmentContainerComponent } from '../../container/edit-adjustment-container/edit-adjustment-container.component';
import { Observable } from 'rxjs';
import { ConfirmationPopOverComponent } from '../confirmation-pop-over/confirmation-pop-over.component';

@Component({
  selector: 'app-view-bill-details',
  templateUrl: './view-bill-details.component.html',
  styleUrls: ['./view-bill-details.component.scss']
})
export class ViewBillDetailsComponent implements OnInit,OnDestroy {

  displayedColumnsofTripDetails = ['ride_id', 'rider_name', 'booking_time', 'end_ride_time', 'basic', 'cgst', 'sgst', 'total_payable'];
  displayedColumnsofMiscellaneousDetails: string[] = ['ride_id', 'rider_name', 'booking_time', 'description', 'total_payable', 'action'];

  dataSourceofTripDetails: MatTableDataSource<TripDetailsModel>;
  dataSourceofMiscellaneousDetails: MatTableDataSource<Adjustments>;

  @ViewChild("tripSort", {static: true}) tripsort: MatSort;
  @ViewChild("adjustmentSort", {static: true}) adjustmentSort: MatSort;
  @ViewChild("trippaginator", {static: true}) tripPaginator: MatPaginator;
  @ViewChild("adjustmentPaginator", {static: true}) adjustmentPaginator: MatPaginator;

  billDetails: BillDetailsModel;
  adjustments: AdjustmentsMaintain[] = [];

  @Output() saveAdjustmentEvent = new EventEmitter();
  @Output() billpaidEvent = new EventEmitter();

  @Input() final_amount: number;
  @Input() billDetails$: Observable<BillDetailsModel>;

  private subs = new SubSink();

  adjustment_amount: number = 0;
  final_adjusted_amount: number = 0;
  bill_payment_settled_flag: boolean = false;
  adjustments_done_flag: boolean = false;

  constructor(public languageService: LanguageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.bill_payment_settled_flag = false;
    // if(!!this.billDetails) {
      this.billDetails$.subscribe(
        billDetails => {
          if(!!billDetails && !!billDetails.adjustment_details && !!billDetails.bill_trip_details) {
            this.adjustments = [];
            this.billDetails = JSON.parse(JSON.stringify(billDetails));
            this.adjustments = JSON.parse(JSON.stringify(billDetails.adjustment_details));
            this.adjustments.forEach((m, index)=> m.id= index);
            console.log( this.adjustments);
            this.dataSourceofTripDetails = new MatTableDataSource<TripDetailsModel>(this.billDetails.bill_trip_details);
            this.dataSourceofTripDetails.sort = this.tripsort;
            this.dataSourceofTripDetails.paginator = this.tripPaginator;
            this.dataSourceofMiscellaneousDetails = new MatTableDataSource<AdjustmentsMaintain>(this.adjustments);
            this.dataSourceofMiscellaneousDetails.sort = this.adjustmentSort;
            this.dataSourceofMiscellaneousDetails.paginator = this.adjustmentPaginator;
            this.adjustments.forEach(element => {
              this.adjustment_amount = this.adjustment_amount + element.adjusted_amount;
            })
            this.final_adjusted_amount = this.billDetails.corporate_bill.amount_due + this.adjustment_amount;
            console.log("final amount",this.final_adjusted_amount.toFixed(2));
          }
        }
      )
    // }
  }

  addAdjustment(value: BillDetailsModel) {
    // this.final_amount = 0;
    var dialogRef = this.dialog.open(AddAdjustmentFormContainerComponent,
      {
        width: '80%',
        disableClose: true,
        data: value.corporate_bill.corporate_billing_id
      });
      dialogRef.afterClosed().subscribe(result => {
      if(!!result) {
        this.final_amount = 0;
        this.adjustments.push({
          adjusted_amount: result.adjusted_amount,
          booking_time: result.booking_time,
          descriptions: result.descriptions,
          trip_ref_no: result.trip_ref_no,
          rider_name: result.rider_name,
          id: this.adjustments.length
        });
        // TODO: calculate due amount
        console.log(this.adjustments);
        this.adjustments_done_flag = true;
        this.dataSourceofMiscellaneousDetails = new MatTableDataSource<AdjustmentsMaintain>(this.adjustments);
        this.dataSourceofMiscellaneousDetails.sort = this.adjustmentSort;
        this.dataSourceofMiscellaneousDetails.paginator = this.adjustmentPaginator;
        this.adjustments.forEach(element => {
          this.final_amount = this.final_amount + element.adjusted_amount;
        })
        this.final_amount = this.final_amount + this.billDetails.corporate_bill.amount_due;
        console.log("from add",this.final_amount);
      }
    })
  }

  edit(value: AdjustmentsMaintain) {
    if(!!value) {
      console.log(value);
      
      // this.final_amount = 0;
      var dialog = this.dialog.open(EditAdjustmentContainerComponent,
        {
          width: '80%',
          disableClose: true,
          data: value
        }
      );
      dialog.afterClosed().subscribe(result => {
        if (!!result) {
          console.log(result);
          this.final_amount = 0;
          console.log(this.adjustments);
          this.adjustments[this.adjustments.findIndex(i => i.id == result.id)] = {
            adjusted_amount: result.adjusted_amount,
            booking_time: result.booking_time,
            descriptions: result.descriptions,
            trip_ref_no: result.trip_ref_no,
            rider_name: result.rider_name,
            id: this.adjustments.length
          }
          this.adjustments_done_flag = true;
          this.dataSourceofMiscellaneousDetails = new MatTableDataSource<AdjustmentsMaintain>(this.adjustments);
          this.dataSourceofMiscellaneousDetails.sort = this.adjustmentSort;
          this.dataSourceofMiscellaneousDetails.paginator = this.adjustmentPaginator;
          // TODO: calculate due amount
          console.log(this.adjustments);
          this.adjustments.forEach(element => {
            this.final_amount = this.final_amount + element.adjusted_amount;
          })
          this.final_amount = this.final_amount + this.billDetails.corporate_bill.amount_due;
          console.log("from edit",this.final_amount);
        }
      })
    }
  }

  delete(value: AdjustmentsMaintain) {
    if(!!value) {
      this.final_amount = 0;
      this.adjustments=this.adjustments.filter(m=> m.id != value.id);
      this.adjustments_done_flag = true;
      this.dataSourceofMiscellaneousDetails = new MatTableDataSource<AdjustmentsMaintain>(this.adjustments);
      this.dataSourceofMiscellaneousDetails.sort = this.adjustmentSort;
      this.dataSourceofMiscellaneousDetails.paginator = this.adjustmentPaginator;
      // TODO: calculate due amount
      console.log(this.adjustments);
      this.adjustments.forEach(element => {
        this.final_amount = this.final_amount + element.adjusted_amount;
      })
      this.final_amount = this.final_amount + this.billDetails.corporate_bill.amount_due;
      console.log("from delete",this.final_amount);
    }
  }

  save() {
    this.adjustments_done_flag = false;
    console.log(this.final_amount);
    console.log(this.adjustments);
    var  adm : Adjustments[] = [];
    this.adjustments.forEach(m=> {adm.push({
      adjusted_amount: m.adjusted_amount,
      booking_time: m.booking_time,
      descriptions: m.descriptions,
      trip_ref_no: m.trip_ref_no,
      rider_name: m.rider_name
    })})
    var formData: generateAdjustmentService = {
      adjustments: adm,
      final_adjusted_amount: this.final_amount
    }
    console.log(formData);
    this.saveAdjustmentEvent.emit(formData);
  }

  billPaymentStatus(corporate_billing_id: number) {
    var dialog = this.dialog.open(ConfirmationPopOverComponent,
      {
        maxWidth: '50%',
        data: {
          title: "Confirmation Message",
          message: "On clicking YES you will acknowledge the payment from the Corporate"
        }
      }
    );
    dialog.afterClosed().subscribe(
      result => {
        console.log(result);
        if(result == true){
          this.bill_payment_settled_flag = true;
          this.billpaidEvent.emit(corporate_billing_id);
        } else {
          this.bill_payment_settled_flag = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}