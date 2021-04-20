import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { LatLng, Geocoding } from 'src/app/models/mapMyIndiaModel';
import { DomainData } from 'src/app/models/domainModel';
import { userType } from 'src/app/models/userManagement';
import { countries } from 'src/app/models/asset-inventoryModel';

@Injectable({
  providedIn: 'root'
})
export class MapmyindiaService {

  constructor(private http: HttpClient) { }
  // getToken(): Observable<any> {
  //   var emptyVariable = null;
  //   var apiUrl = environment.urls.securityURL+ environment.urls.grantType + "&client_id=" + environment.urls.clientId + "&client_secret="+environment.urls.clientSecret;
  //   console.log('url');
  //   console.log(apiUrl);
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   return this.http.post<any>(apiUrl, emptyVariable);
  // }
  
  // reversegeocoding(data: LatLng): Observable<Geocoding> {
  //   console.log(data);
  //   var geo_codingUrl = environment.urls.reverseGeocodingUrl + data.latitude +"&lng=" + data.longitude; 
  //   return this.http.get<Geocoding>(geo_codingUrl);
  // }

  getRentalpointType(): Observable<DomainData[]> {
    var data: userType = {
      domain_type: "rentalpoint_type"
    }
    return this.http.post<DomainData[]>(environment.urls.GetUserTypeURL, data);
  }

  getOwnershipCode(): Observable<DomainData[]> {
    var data: userType = {
      domain_type: "ownership_code",
    }
    return this.http.post<DomainData[]>(environment.urls.GetUserTypeURL, data);
  }

  getRentalPointStatus(): Observable<DomainData[]> {
    var data: userType = {
      domain_type: "rentalpoint_status",
    }
    return this.http.post<DomainData[]>(environment.urls.GetUserTypeURL, data);
  }

  GetCountries():Observable<countries[]>{
    return this.http.get<countries[]>(environment.urls.GetCountriesURL);
  }
}
