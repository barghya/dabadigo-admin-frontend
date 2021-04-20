import { Injectable } from '@angular/core';
import { LoginModel, firsttimepasswordchange, forgetpassword } from 'src/app/models/userModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  LoginService(data: LoginModel): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.LoginURL, data)
  }
  FirstTimePasswordChange(data: firsttimepasswordchange): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.firsttimepasswordchangeURL, data);
  }
  UserForgetPassword(data: forgetpassword): Observable<any>{
    return this.http.post<any>(environment.urls.userForgetPassword, data)
  }
}
