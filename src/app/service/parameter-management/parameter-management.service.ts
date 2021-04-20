import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parameter, EditParameter } from 'src/app/models/parametermanagementModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterManagementService {

  constructor(private http: HttpClient) { }

  getParameterList(): Observable<Parameter[]> {
    return this.http.get<Parameter[]>(environment.urls.parameterListUrl);
  }
  DuplicateParameter(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateParameter, {parameter_key : value});
  }
  AddParameter(data: Parameter): Observable<any>{
    return this.http.post<any>(environment.urls.AddParameterURL, data);
  }
 
  singleParameterload(data: EditParameter): Observable<any>{
    return this.http.post<any>(environment.urls.singleParameterUrl, data);
  }
  editParameter(data: Parameter): Observable<any> {
    return this.http.post<any>(environment.urls.parameterEditUrl, data);
  }
}
