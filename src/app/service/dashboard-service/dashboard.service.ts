import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { admnId } from 'src/app/models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPollingData(data:admnId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.pollingDataUrl, data);
  }

  dashboardPolling(data: admnId): Observable<any> {
    return this.http.post<any>(environment.urls.dashboardPollingUrl, data);
  }
  
}
