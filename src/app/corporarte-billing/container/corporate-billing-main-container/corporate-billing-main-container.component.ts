import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BillsTableModel, BillsSetupModel, CorporateBillsFilterPayload, generatePdfExcelService } from 'src/app/models/corporateBillingModel';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { CorporateBillsListLoadAction, CorporateBillsFilterAction, BillingGeneratePDFAction } from 'src/app/store/actions/corporate_billing.action';
import { SubSink } from 'subsink';
import { CityItem, states } from 'src/app/models/regionManagement';
import { countries } from 'src/app/models/asset-inventoryModel';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-corporate-billing-main-container',
  templateUrl: './corporate-billing-main-container.component.html',
  styleUrls: ['./corporate-billing-main-container.component.scss']
})
export class CorporateBillingMainContainerComponent implements OnInit {

  bills$: Observable<BillsTableModel[]>;
  corporatesSetup$: Observable<BillsSetupModel[]>;
  countries$: Observable<countries[]>;
  states$: Observable<states[]>;
  cities$: Observable<CityItem[]>;
  billStatusList$: Observable<DomainData[]>;
  private subs = new SubSink();
  corporate_id: number;
  doc_type: string;
  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe(params => {
      var corporate_id = +params['id'];
      var submitData: CorporateBillsFilterPayload = {
        city: null,
        country: null,
        days_pending: null,
        corporate_id: !!corporate_id ? corporate_id : null,
        start_date: null,
        end_date: null,
        state: null,
        status: 1
      }
      this.store.dispatch(new CorporateBillsListLoadAction(submitData));
    }));
    this.bills$ = this.store.select(state => state.corporate_billing.bills);
    this.corporatesSetup$ = this.store.select(state => state.corporate_billing.billsSetupModel);
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
  
    if(this.doc_type == 'pdf'){
      return new Blob([bytes], { type: 'application/pdf' });
    }
    else {
      return new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }    
  };

  viewBill(corporate_billing_id: number) {
    this.router.navigate(['corporate-billing', 'view-bill', corporate_billing_id]);
  }

  FilterBills(data: CorporateBillsFilterPayload) {
    this.store.dispatch(new CorporateBillsFilterAction(data));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  GeneratePDF(data: generatePdfExcelService) {
    console.log(data);
    this.doc_type = data.doc_type;
    this.store.dispatch(new BillingGeneratePDFAction(data));
  }

  SendEmail(corporate_billing_id: number) {
    console.log(corporate_billing_id);
    this.router.navigate(['corporate-billing','send-email', corporate_billing_id]);
  }
}
