import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalPoint, RpId, GetRp, RentalPoint2, AvailableBatteryService, AddBatteryService, BatteryRemoveService, AvailableFranchise } from 'src/app/models/rentalPoint';
import { environment } from 'src/environments/environment';
import { DomainData } from 'src/app/models/domainModel';
import { userType } from 'src/app/models/userManagement';
import { countries } from 'src/app/models/asset-inventoryModel';

@Injectable({
  providedIn: 'root'
})
export class RentalPointService {

  constructor(private http: HttpClient) { }

  GetRentalPoints(): Observable<RentalPoint[]> { 
    return this.http.get<RentalPoint[]>(environment.urls.RentalPointURL);
  }

  addRentalpoint(data: RentalPoint2): Observable<any>  {
    return this.http.post<any>(environment.urls.AddRentalPointUrl, data);
  }

  GetavailableFranchise(): Observable<AvailableFranchise[]> {
    return this.http.get<AvailableFranchise[]>(environment.urls.AvailableFranchiseUrl);
  }

  deleteRentalPoint(data: RpId): Observable<any> {
    return this.http.post<any>(environment.urls.deleteRentalPointUrl, data);
  }
  
  getSingleRentalpoint(data: RpId): Observable<any> {
    return this.http.post<any>(environment.urls.editRentalPointByIdUrl, data);
  }

  editRentalPoint(data: GetRp): Observable<any> {
    return this.http.put(environment.urls.editRentalPoint, data);
  }

  getRentalPointHistory(data: RpId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.rentalPointHistory, data);
  }

  moveRentalPoint(data: RpId): Observable<any> {
    return this.http.post<any>(environment.urls.moveRentalPointUrl, data);
  }

  duplicaterentalpointShortcode(value: string): Observable<any> {
    return this.http.post<any>(environment.urls.duplicateRpUrl, {rentalpoint_shortcode: value});
  }

  getRentalpointType(): Observable<any> {
    var data: userType = {
      domain_type: "rentalpoint_type"
    }
    return this.http.post<any>(environment.urls.GetUserTypeURL, data);
  }

  getOwnershipCode(): Observable<any> {
    var data: userType = {
      domain_type: "ownership_code",
    }
    return this.http.post<any>(environment.urls.GetUserTypeURL, data);
  }

  getRentalPointStatus(): Observable<any> {
    var data: userType = {
      domain_type: "rentalpoint_status",
    }
    return this.http.post<any>(environment.urls.GetUserTypeURL, data);
  }

  GetCountries():Observable<countries[]>{
    return this.http.get<countries[]>(environment.urls.GetCountriesURL);
  }

  getBatterySwapPointByRegion(region_id: number): Observable<any> {
    return this.http.post(environment.urls.batterySwapPointsByRegion, { region_id: region_id });
  }
  getAvailableBattery(data: AvailableBatteryService): Observable<any> {
    return this.http.post(environment.urls.GetAvailableBattery , data);
  }
  AddBatteryRp(data: AddBatteryService):Observable<any>{
    return this.http.post(environment.urls.AddBatteryRpUrl, data)
  }
  removeBattery(data: BatteryRemoveService): Observable<any> {
    return this.http.post(environment.urls.removeBatteryUrl, data);
  }
  getRentalpointsByRegion(region_id: number): Observable<any> {
    return this.http.post(environment.urls.RentalpointsByRegion, { region_id: region_id });
  }
}
