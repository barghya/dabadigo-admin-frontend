import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { changePassword, changeMobile } from 'src/app/models/profileManagement';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {

  constructor(private http: HttpClient) { }

  CreateNewPassword(data: changePassword): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.createPassword, data);
  }

  ChangeMobileNumber(data: changeMobile): Observable<any> {
    return this.http.post<any>(environment.urls.changeMobileNumberUrl, data)
  }
}
