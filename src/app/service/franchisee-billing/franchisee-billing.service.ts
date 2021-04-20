import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FranchiseeSetUps, Franchisees, CreateFranchiseeSetup, FranchiseeBillsFilterPayload, getPaymentDetails, generatePenaltyService } from 'src/app/models/franchiseeBillingModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FranchiseeBillingService {

  constructor(private http: HttpClient) { }

  GetBillsSetups(): Observable<FranchiseeSetUps[]> {
    return this.http.get<FranchiseeSetUps[]>(environment.urls.getFranchiseeSetupUrl);
  }

  AddSetupLoad(): Observable<Franchisees[]> {
    return this.http.get<Franchisees[]>(environment.urls.addFranchiseeLoadUrl);
  }

  AddSetup(data: CreateFranchiseeSetup): Observable<any> {
    return this.http.post<any>(environment.urls.addFranchiseeUrl, data);
  }

  FilterFranchiseePayments(data: FranchiseeBillsFilterPayload): Observable<any> {
    return this.http.post<any>(environment.urls.FilterPayments, data);
  }

  ViewFranchiseePaymentDetails(data: getPaymentDetails): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.ViewPaymentDetailsUrl, data);
  }

  AddPenalty(data: generatePenaltyService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.AddPenaltyUrl, data);
  }

  FranchiseePayment(franchise_payment_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.FranchiseePaymentAcknowledgeUrl, {franchise_payment_id: franchise_payment_id});
  }
}
