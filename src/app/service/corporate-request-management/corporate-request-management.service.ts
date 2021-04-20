import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { adminUserID, pendingRequest, ApproveRequestPayload, LoadRequestsPayload } from 'src/app/models/corporateRequestManagementModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { users } from 'src/app/models/userManagement';

@Injectable({
  providedIn: 'root'
})
export class CorporateRequestManagementService {

  constructor(private http: HttpClient) { }

  getCorporateRequest(data: LoadRequestsPayload): Observable<any> {
    return this.http.post<any>(environment.urls.getCorporateRequestURL, data);
  }
  approveRequest(data: ApproveRequestPayload): Observable<any> {
    return this.http.post<any>(environment.urls.approveRequestURL, data);
  }
  rejectRequest(data: ApproveRequestPayload): Observable<any> {
    return this.http.post<any>(environment.urls.rejectRequestUrl, data);
  }
  getRequestDetail(corporate_customer_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.getCorporateRequestDetailURL, { corporate_customer_id: corporate_customer_id });
  }
}
