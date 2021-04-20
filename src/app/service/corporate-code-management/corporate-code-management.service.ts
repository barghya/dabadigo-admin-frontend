import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { corporateCodeList, corporateCodeID } from 'src/app/models/corporateCodeManagementModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporateCodeManagementService {

  constructor(private http: HttpClient) { }

  GetCodeList(): Observable<corporateCodeList[]> {
    return this.http.get<corporateCodeList[]>(environment.urls.getCorporateCodeUrl);
  }

  CreateCode(data: corporateCodeList): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.createCorporateCodeUrl, data);
  }

  UpdateCode(data: corporateCodeList): Observable<any> {
    return this.http.put<any>(environment.urls.updateCorporateCodeUrl, data);
  }

  GetCodeById(data: corporateCodeID): Observable<any> {
    return this.http.post<any>(environment.urls.getByIdCorporateCodeUrl, data);
  }

  CheckDuplicateCorporateCode(data: string) {
    return this.http.post<any>(environment.urls.checkDuplicateCorporateCode, { corporate_code: data });
  }

  DeleteCorporateCode(data: corporateCodeID): Observable<any> {
    return this.http.post(environment.urls.deleteCorporateCodeUrl, data);
  } 
  
}
