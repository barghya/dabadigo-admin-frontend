import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TripDetailsModel, Adjustments, BillDetailsModel } from 'src/app/models/corporateBillingModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-bills-detail',
  templateUrl: './corporate-bills-detail.component.html',
  styleUrls: ['./corporate-bills-detail.component.scss']
})
export class CorporateBillsDetailComponent implements OnInit {

  displayedColumnsofTripDetails = ['ride_id', 'rider_name', 'booking_time', 'end_ride_time', 'basic', 'cgst', 'sgst', 'total_payable'];
  displayedColumnsofMiscellaneousDetails: string[] = ['ride_id', 'rider_name', 'booking_time', 'description', 'total_payable'];

  dataSourceofTripDetails: MatTableDataSource<TripDetailsModel>;
  dataSourceofMiscellaneousDetails: MatTableDataSource<Adjustments>;

  @ViewChild("tripSort", {static: true}) tripsort: MatSort;
  @ViewChild("adjustmentSort", {static: true}) adjustmentSort: MatSort;
  @ViewChild("trippaginator", {static: true}) tripPaginator: MatPaginator;
  @ViewChild("adjustmentPaginator", {static: true}) adjustmentPaginator: MatPaginator;

  @Input() billDetails$: Observable<BillDetailsModel>;

  private subs = new SubSink();
  billDetails: BillDetailsModel;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.billDetails$.subscribe(
      billDetails => {
        this.billDetails = billDetails;
        if (!!billDetails && !!billDetails.adjustment_details) {
          this.dataSourceofTripDetails = new MatTableDataSource<TripDetailsModel>(billDetails.bill_trip_details);
          this.dataSourceofTripDetails.sort = this.tripsort;
          this.dataSourceofTripDetails.paginator = this.tripPaginator;
          this.dataSourceofMiscellaneousDetails = new MatTableDataSource<Adjustments>(billDetails.adjustment_details);
          this.dataSourceofMiscellaneousDetails.sort = this.adjustmentSort;
          this.dataSourceofMiscellaneousDetails.paginator = this.adjustmentPaginator;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
