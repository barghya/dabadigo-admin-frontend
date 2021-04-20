import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActiveInactiveRequest, customerKycDetails, ApproveRequest } from 'src/app/models/customerKycVerificationModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerKycVarificationService {

  constructor(private http: HttpClient) { }

  getCustomer(admn_user_id: number): Observable<customerKycDetails[]> {
    return this.http.post<customerKycDetails[]>(environment.urls.getCustomerUrl, {admn_user_id: admn_user_id});
  }
  activeRequest(data: ActiveInactiveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.activeUrl, data);
  }

  inactiveRequest(data: ActiveInactiveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.inactiveUrl, data);
  }

  getKycUrl(data: ActiveInactiveRequest): Observable<any>{
    return this.http.post<any>(environment.urls.customerKycdocdetailslUrl, data);
  }
  approveRequest(data: ApproveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.ApproveRequestUrl, data);
  }
}
