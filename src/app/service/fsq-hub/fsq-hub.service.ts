import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FSQHubDetails, managers, AddFSQHub, editHub, editFSQHub, Region, HubRegion, hubregion, hubmanager } from 'src/app/models/fsqhubModel';
import { environment } from 'src/environments/environment';
import { RegionItem } from 'src/app/models/regionManagement';

@Injectable({
  providedIn: 'root'
})
export class FsqHubService {

  constructor(private http: HttpClient) { }

  getFSQHubList(): Observable<FSQHubDetails[]> {
    return this.http.get<FSQHubDetails[]>(environment.urls.getFSQHubListUrl);
  }
  
  getHub(admn_user_id: number): Observable<FSQHubDetails[]> {
    return this.http.post<FSQHubDetails[]>(environment.urls.getFSQ, {admn_user_id: admn_user_id});
  }
  
  GetavailableRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(environment.urls.getregionList);
  }

  GetavailableManagers(): Observable<managers[]> {
    return this.http.get<managers[]>(environment.urls.getManagerList);
  }
  AddFSQHub(data: AddFSQHub): Observable<any>{
    return this.http.post<any>(environment.urls.AddFSQHubURL, data);
  }
  getSingleHub(data: editHub): Observable<any> {
    console.log(data);
    
    return this.http.post<any>(environment.urls.EditHubLoadUrl,data);
  }
  EditFSQHub(data:AddFSQHub): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.UpdateFSQHubURL, data)
  }

  duplicateHubcode(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateHubcode, {hub_short_code : value});
  }
  RemoveRegion(data:hubregion): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.RemoveRegionURL, data);
  }
  RemoveManager(data:hubmanager): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.RemoveManagerURL, data);
  }
}
