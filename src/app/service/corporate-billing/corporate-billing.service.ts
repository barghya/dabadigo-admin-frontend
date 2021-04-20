import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorporateDetails, BillsSetupModel, CreateBillSetupModel, BillsbyCorporateId, corporateDetailsByBillid, CorporateBillsFilterPayload, SendEmailModel, MiscellaneousAdjustmentsModel, Adjustments, generateAdjustmentService, generatePdfExcelService } from 'src/app/models/corporateBillingModel';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class CorporateBillingService {

  constructor(private http: HttpClient) { }

  GetCorporateBills(data: BillsbyCorporateId): Observable<any> {
    return this.http.post<any>(environment.urls.GetCorporateBills, data);
  }

  GetAllBillSetups(): Observable<BillsSetupModel[]> {
    return this.http.get<BillsSetupModel[]>(environment.urls.GetAllBillSetups);
  }

  GetLegalEntities(): Observable<CorporateDetails[]> {
    return this.http.get<CorporateDetails[]>(environment.urls.GetLegalEntities);
  }

  GetCorporates(): Observable<CorporateDetails[]> {
    return this.http.get<CorporateDetails[]>(environment.urls.GetAllCorporates);
  }

  CreateSetup(data: CreateBillSetupModel): Observable<any> {
    return this.http.post<any>(environment.urls.CreateSetup, data);
  }

  GetOrganizationDetails(data: corporateDetailsByBillid): Observable<any> {
    return this.http.post<any>(environment.urls.GetorganizationDetails, data);
  }

  GetCorporateDetails(data: corporateDetailsByBillid): Observable<any> {
    return this.http.post<any>(environment.urls.GetCorporateDetails, data);
  }

  GetBillDetails(corporate_billing_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.GetBillDetails, {corporate_billing_id: corporate_billing_id});
  }

  FilterCorporateBills(data: CorporateBillsFilterPayload): Observable<any> {
    return this.http.post<any>(environment.urls.filterCorporateBillsUrl, data);
  }

  GeneratePDF(data: generatePdfExcelService) {
    return this.http.post<any>(environment.urls.generatePDFUrl, data);
  }

  SendEmail(data: SendEmailModel) {
    return this.http.post<any>(environment.urls.sendEmailUrl, data);
  }

  SendEmailLoadInfo(corporate_billing_id: number) {
    return this.http.post<any>(environment.urls.sendEmailLoad, {corporate_billing_id: corporate_billing_id})
  }

  GenerateAdjustment(data: generateAdjustmentService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.GenerateAdjustment, data);
  }

  BillPayment(corporate_billing_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.BillPaymentUrl, {corporate_billing_id: corporate_billing_id})
  }
}