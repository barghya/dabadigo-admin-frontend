import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StateTaxItem } from 'src/app/models/stateTaxModel';

@Injectable({
  providedIn: 'root'
})
export class StateTaxService {

  constructor(private http: HttpClient) { }

  getAllStateTaxes(): Observable<StateTaxItem[]>{
    return this.http.get<StateTaxItem[]>(environment.urls.getAllStateTaxesUrl);
  }
 
  getSingleStateTax(admn_state_tax_id: number): Observable<any>{
    return this.http.post<any>(environment.urls.getSingleStateTaxUrl, { admn_state_tax_id: admn_state_tax_id });
  }

  getStateTaxesByState(state_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.getStateTaxesByStateUrl, { state_id: state_id });
  }

  createStateTax(data: StateTaxItem): Observable<any> {
    return this.http.post<any>(environment.urls.createStateTaxUrl, data);
  }

  updateStateTax(data: StateTaxItem): Observable<any> {
    return this.http.post<any>(environment.urls.updateStateTaxUrl, data);
  }

  deleteStateTax(admn_state_tax_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.deleteStateTaxUrl, {admn_state_tax_id: admn_state_tax_id});
  }
}
