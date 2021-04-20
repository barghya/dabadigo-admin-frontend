import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { userRole, EditRole, PermissionDetails, EditUserType, UserType,} from 'src/app/models/roleManagementModel';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  constructor(private http: HttpClient) { }

  getRoleList(): Observable<userRole[]> {
    return this.http.get<userRole[]>(environment.urls.getRoleList);
  }
  AddRole(data: userRole): Observable<any>{
    return this.http.post<any>(environment.urls.AddRoleURL, data);
  }
  singleRoleload(data: userRole): Observable<any>{
    return this.http.post<any>(environment.urls.singleRoleUrl, data);
  }
  editRole(data: userRole): Observable<any> {
    return this.http.post<any>(environment.urls.roleEditUrl, data);
  }
  getPermissionList(data: EditRole): Observable<any> {
    return this.http.post<any>(environment.urls.getPermissionListUrl, data);
  }
  getUserTypeList(data: EditUserType): Observable<any> {
    return this.http.post<any>(environment.urls.getUserTypeListUrl, data);
  }
  updatePermission(data: PermissionDetails): Observable<any> {
    return this.http.post<any>(environment.urls.updatePermissionUrl, data)
  }
  updateUserType(data: UserType): Observable<any> {
    return this.http.post<any>(environment.urls.updateUserTypeUrl, data)
  }
}
