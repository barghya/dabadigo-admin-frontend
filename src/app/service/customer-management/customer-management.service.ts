import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { customerDetails, ActiveInactiveRequest } from 'src/app/models/customerManagementModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  constructor(private http: HttpClient) { }

  getCustomer(admn_user_id: number): Observable<customerDetails[]> {
    return this.http.post<customerDetails[]>(environment.urls.getCustomerUrl, {admn_user_id: admn_user_id});
  }

  activeRequest(data: ActiveInactiveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.activeUrl, data);
  }

  inactiveRequest(data: ActiveInactiveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.inactiveUrl, data);
  }

  getSingleCustomer(data: ActiveInactiveRequest): Observable<any> {
    return this.http.post<any>(environment.urls.singleCustomerDetailUrl, data);
  }

  searchCustomer(search_string: string) {
    return this.http.post<any>(environment.urls.searchCustomerUrl, { search_string: search_string });
  }
  
}
