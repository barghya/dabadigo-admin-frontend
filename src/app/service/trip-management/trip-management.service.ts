import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tripDetail, rentalPointDetails, rentalPoint, endTrip, tripAssociationID } from 'src/app/models/tripManagementModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripManagementService {

  constructor(private http: HttpClient) { }

  getTrip(admn_user_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.getTripListUrl, {admn_user_id: admn_user_id});
  }

   
  getLatLon(data: any): Observable<rentalPoint> {
    return this.http.post<rentalPoint>(environment.urls.getLatLonUrl, data);
  }

  getRentalPoint(data:rentalPoint): Observable<any> {
    return this.http.post<any>(environment.urls.getRentalPointListUrl, data);
  }
  endTrip(data: endTrip): Observable<any>{
    return this.http.post<any>(environment.urls.EndTripURL, data);
  }
  
  getTripDetails(data:tripAssociationID): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.tripdetailsURL, data)
  }
}
