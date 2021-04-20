import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTermsandConditions, AddTandC, UpdateTandC } from 'src/app/models/termsandconditionsModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsAndConditionsService {

  constructor(private http: HttpClient) { }

  GetTermsandConditions(): Observable<GetTermsandConditions[]> {
    return this.http.get<GetTermsandConditions[]>(environment.urls.getTermsandConditionsUrl)
  }

  AddTermsandConditions(data: AddTandC): Observable<any> {
    return this.http.post<any>(environment.urls.addTermsandConditionsUrl, data);
  }

  UpdateTermsAndConditionLoad(tandcid: number): Observable<any> {
    return this.http.post<any>(environment.urls.updateTermsandConditionsLoadURL, {tandcid: tandcid});
  }

  UpdateTermsandConditions(data: UpdateTandC): Observable<any> {
    return this.http.post<any>(environment.urls.updateTermsandConditions, data);
  }
}
