import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorporateManagement, AdmnPartnerId } from 'src/app/models/corporateManagement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporateManagementService {

  constructor(private http: HttpClient) { }
  getAllCorporate(): Observable<CorporateManagement[]> {
    return this.http.get<CorporateManagement[]>(environment.urls.getCorporateUrl);
  }

  getACorporate(data: AdmnPartnerId): Observable<any> {
    return this.http.post<any>(environment.urls.getCorporateByIdUrl, data);
  }



  updatecorporate(data: CorporateManagement): Observable<any> {
    return this.http.put<any>(environment.urls.editCorporateUrl, data);
  }

  CreateCorporate(data:CorporateManagement): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.createCorporateURL, data);
  }

  DuplicateCorporatePartCode(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicatePartnerCodeURL, {partner_code : value});
  }
}
