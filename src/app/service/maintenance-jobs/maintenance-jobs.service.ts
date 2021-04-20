import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MaintenanceJobsFilterPayload, MaintenanceJobResolvePayload, MaintenanceJobAssignPayload, MaintenanceJobCreatePayload, MaintenanceScheduleItem } from 'src/app/models/maintenanceJobsModel';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceJobsService {

  constructor(private http: HttpClient) { }

  getMaintenanceJobs(past_flag: boolean): Observable<any> {
    return this.http.post(environment.urls.getMaintenanceJobsUrl, { past_flag: past_flag });
  }

  getMaintenanceJobsFiltered(data: MaintenanceJobsFilterPayload): Observable<any> {
    return this.http.post(environment.urls.getMaintenanceJobsFilteredUrl, data);
  }

  getMaintenanceJobDetailById(work_item_id: number): Observable<any> {
    return this.http.post(environment.urls.getMaintenanceJobsByIdUrl, { work_item_id: work_item_id });
  }

  resolveMaintenanceJob(data: MaintenanceJobResolvePayload): Observable<any> {
    return this.http.post(environment.urls.resolveMaintenanceJobUrl, data);
  }

  assignMaintenanceJob(data: MaintenanceJobAssignPayload): Observable<any> {
    return this.http.post(environment.urls.assignMaintenanceJobUrl, data);
  }

  createMaintenanceJob(data: MaintenanceJobCreatePayload): Observable<any> {
    return this.http.post(environment.urls.createMaintenanceJobUrl, data);
  }

  getScheduleByVehicleType(vehicle_type: number): Observable<any> {
    return this.http.post(environment.urls.getScheduleByVehicleTypeUrl, {vehicle_type: vehicle_type});
  }

  updateMaintenanceSchedule(data: MaintenanceScheduleItem[]): Observable<any> {
    return this.http.post(environment.urls.updateMaintenanceScheduleUrl, data);
  }

}
