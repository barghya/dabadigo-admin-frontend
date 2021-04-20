import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FranchiseAssets } from 'src/app/models/franchiseVehicleModel';

@Injectable({
  providedIn: 'root'
})
export class FranchiseVehicleService {

  constructor(private http: HttpClient) { }
  GetFranchiseVehicle(admn_user_id: number): Observable<FranchiseAssets[]>  {
    console.log(admn_user_id);
    return this.http.post<FranchiseAssets[]>(environment.urls.FranchiseVehicleUrl, {admn_user_id: admn_user_id});
  }
}
