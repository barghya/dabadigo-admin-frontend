import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRentalpoint, GetRp, RpId } from 'src/app/models/franchiseRentalPointModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FranchiseRentalPointService {

  constructor(private http: HttpClient) { }

  GetFranchiseRentalPoints(admn_user_id: number): Observable<GetRp[]>  {
    console.log(admn_user_id);
    return this.http.post<GetRp[]>(environment.urls.FranchiseRentalPointUrl, {admn_user_id: admn_user_id});
  }
  getFranchiseRentalPointHistory(data: RpId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FranchiserentalPointHistory, data);
  }
}
