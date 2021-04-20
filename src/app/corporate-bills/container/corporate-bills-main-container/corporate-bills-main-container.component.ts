import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BillsTableModel, BillsSetupModel, CorporateBillsFilterPayload, generatePdfExcelService } from 'src/app/models/corporateBillingModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { CorporateBillsListLoadAction, CorporateBillsFilterAction, BillingGeneratePDFAction } from 'src/app/store/actions/corporate_billing.action';

@Component({
  selector: 'app-corporate-bills-main-container',
  templateUrl: './corporate-bills-main-container.component.html',
  styleUrls: ['./corporate-bills-main-container.component.scss']
})
export class CorporateBillsMainContainerComponent implements OnInit {
  bills$: Observable<BillsTableModel[]>;
  countries$: Observable<countries[]>;
  states$: Observable<states[]>;
  cities$: Observable<CityItem[]>;
  billStatusList$: Observable<DomainData[]>;
  private subs = new SubSink();
  corporate_id: number;
  
  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.store.select(state => state.profile_management.singleProfile).subscribe(userDetail => {
      if(!!userDetail){  
        this.corporate_id = userDetail.corporate_id;
        var submitData: CorporateBillsFilterPayload = {
          city: null,
          country: null,
          days_pending: null,
          corporate_id: this.corporate_id,
          start_date: null,
          end_date: null,
          state: null,
          status: 1
        }
        this.store.dispatch(new CorporateBillsListLoadAction(submitData));
      }
    }));
    this.bills$ = this.store.select(state => state.corporate_billing.bills);
    this.countries$ = this.store.select(state => state.corporate_billing.countries);
    this.states$ = this.store.select(state => state.corporate_billing.states);
    this.cities$ = this.store.select(state => state.corporate_billing.cities);
    this.billStatusList$ = this.store.select(state => state.corporate_billing.billStatusList);
    this.subs.add(this.store.select(state => state.corporate_billing.pdfData).subscribe(
      pdfData => {
        if(!!pdfData && !!pdfData.encoded_pdf) {
          var newBlob = this.Base64ToBlob(pdfData.encoded_pdf);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }
          const data = window.URL.createObjectURL(newBlob);
          var link = document.createElement('a');
          link.href = data;
          link.target = "_blank"
          link.click();
          setTimeout(function(){
            document.body.removeChild(link);
            window.URL.revokeObjectURL(data);
          }, 100);
        }
      }
    ));
  }

  Base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes], { type: 'application/pdf' });
  };

  viewBill(corporate_billing_id: number) {
    this.router.navigate(['corporate-bills', 'corporate-bills-detail', corporate_billing_id]);
  }

  FilterBills(data: CorporateBillsFilterPayload) {
    data.corporate_id = this.corporate_id;
    this.store.dispatch(new CorporateBillsFilterAction(data));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  GeneratePDF(data: generatePdfExcelService) {
    console.log(data);
    this.store.dispatch(new BillingGeneratePDFAction(data));
  }

}
