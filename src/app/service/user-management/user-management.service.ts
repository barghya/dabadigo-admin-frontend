import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users, userId, AddUser, userName } from 'src/app/models/userManagement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  GetUserList(admn_user_id: number): Observable<users[]>{
    return this.http.post<users[]>(environment.urls.AdminListURL, { admn_user_id: admn_user_id });
  }

  GetRoleName(admn_user_id: number): Observable<users[]>{
    return this.http.post<users[]>(environment.urls.GetRoleName, { admn_user_id: admn_user_id });
  }

  CreateUser(data:AddUser): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.AdminCreateURL, data)
  }

  GetUserByID(data:userId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.EditUserById, data)
  }

  EditUser(data:users): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.EditUser, data)
  }

  DeleteUser(data:userId): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.DeleteUser, data);
  }

  resetpassword(data:userId): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.resetpasswordurl, data);
  }

  DuplicateUser(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateUser, {username : value});
  }

  getActiveBeuUsers(): Observable<users[]> {
    return this.http.get<users[]>(environment.urls.ActiveBEUUrl);
  }
}
