import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeployRequestVehicle, VehicleDetails, deploymentRequestID } from 'src/app/models/deployVehicleModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeployVehicleService {

  constructor(private http: HttpClient) { }

  GetVehicleByRequestList(): Observable<DeployRequestVehicle[]> {
    return this.http.get<DeployRequestVehicle[]>(environment.urls.GetVehicleByRequestListURL);
  }

  GetDeployVehicleList(): Observable<VehicleDetails[]> {
    return this.http.get<VehicleDetails[]>(environment.urls.GetDeployVehicleListURL);
  }

  addRequsetVehicle(data: DeployRequestVehicle): Observable<any>  {
    return this.http.post<any>(environment.urls.CreateRequestVehicleURL, data);
  }

  deployVehicleByID(data:deploymentRequestID): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.DeployVehicleByIDURL, data)
  }

  UpdateDeployVehicle(data:DeployRequestVehicle): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.UpdateDeployVehicleURL, data)
  }

  DeleteDepoyVehicle(data:deploymentRequestID): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.DeleteDepoyVehicleURL, data);
  }
  
}

