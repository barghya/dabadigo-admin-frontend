import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegionItem, states, EditRegion, CityItem } from 'src/app/models/regionManagement';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  getRegionList(): Observable<RegionItem[]> {
    return this.http.get<RegionItem[]>(environment.urls.getRegionList);
  }
  
  addRegion(data: RegionItem): Observable<any> {
    return this.http.post<any>(environment.urls.regionaddUrl,data);
  }

  getSingleRegion(data: EditRegion): Observable<any> {
    console.log(data);
    
    return this.http.post<any>(environment.urls.singleRegionUrl, data);
  }

  editRegion(data: RegionItem): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.regionEditUrl, data);
  }
  
  DuplicateRegion(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateRegion, {region_code : value});
  }

  GetStates():Observable<states[]>{
    return this.http.get<states[]>(environment.urls.GetStatesURL);
  }

  getCities(): Observable<CityItem[]> {
    return this.http.get<CityItem[]>(environment.urls.getCitiesUrl);
  }
  
}
