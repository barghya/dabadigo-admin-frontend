import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FSQDetails, ApproveRequestFSQ, FSQRegionUpdate, WorkItem, WorkItemAssignmentRequest, createShiftService, FsqShift, FSQShiftManagementId, WorkItemId, FsqTagedRegion, editShiftService, UserActiveInactive, GetREntalPointService, BookVehicleService, startShiftService, EndShiftService, FsqAllHub, EditHubLevel, AcceptJob, FsqReturnVehicleService, ReturnVehicleService, PauseShiftService, FsqRegionByCity, Breakpoint, ParameterKey } from 'src/app/models/fsqManagement';
import { ParametersType } from '@ngrx/store/src/models';

@Injectable({
  providedIn: 'root'
})
export class FsqManagementService {

  constructor(private http: HttpClient) { }

  getFSQManagement(): Observable<FSQDetails[]> {
    return this.http.get<FSQDetails[]>(environment.urls.getFSQListUrl);
  }

  getFSQ(admn_user_id: number): Observable<FSQDetails[]> {
    return this.http.post<FSQDetails[]>(environment.urls.FSQListUrl, {admn_user_id: admn_user_id});
  }

  approveRequest(data: ApproveRequestFSQ): Observable<any> {
    return this.http.post<any>(environment.urls.fsqApproveRequestUrl, data);
  }
  
  RegionByID(data:ApproveRequestFSQ): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.regionByIDUrl, data)
  }

  UpdateRegion(data:FSQRegionUpdate): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.updateRegionUrl, data)
  }


  getWorkItemList(): Observable<any> {
    console.log("call");
    
    return this.http.get<any>(environment.urls.getWorkItemListUrl);
  }

  //get tasks of a work item
  getSingleWorkItem(work_item_id: number): Observable<any> {
    return this.http.post(environment.urls.getSingleWorkItemUrl, { work_item_id: work_item_id });
  }
  
  //get fsq list
  getActiveFsqList(work_item_type: number): Observable<any> {
    return this.http.post(environment.urls.getActiveFsqListUrl, {work_item_type: work_item_type});
  }

  submitRequest(data: WorkItemAssignmentRequest): Observable<any>{
    return this.http.post<any>(environment.urls.submitRequestURL, data);
  }

  documentVerification(data: ApproveRequestFSQ): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.documentVerificationUrl, data);
  }

  CreateShift(data: createShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.CreateFsqShift, data);
  }

  GetAllShift(){
    return this.http.get<any>(environment.urls.GetAllShiftUrl);
  }
  GetBreakPoint(): Observable<any>{
    var data:ParameterKey = {
      parameter_key: "fsq_max_pause_time"
    }
    return this.http.post<any>(environment.urls.GetbreakpointURL, data);
  }

  GetShiftByID(data:FSQShiftManagementId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.EditShiftById, data)
  }

  DeleteFSQShift(data: FSQShiftManagementId): Observable<any> {
    return this.http.post(environment.urls.DeleteFSQShiftUrl, data);
  }
  EditShift(data: editShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.UpdateShiftURL, data)
  }

  GetIncidentDetail(data: WorkItemId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.GetIncidentDetailUrl, data)
  }
  GetFsqTegedRegion(data: FsqTagedRegion): Observable<any> {
    return this.http.post<any>(environment.urls.getFsqTagedRegionUrl, data )
  }
  FsqActiveInactive(data: UserActiveInactive): Observable<any> {
    return this.http.post<any>(environment.urls.FSQActiveInactiveUrl, data)
  }
  
  FsqShiftRegionRentalPoint(data: FSQShiftManagementId): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FsqGetRentalPoint, data)
  }
  GetVehicleBYREntalPoint(data: GetREntalPointService): Observable<any> {
    return this.http.post<any>(environment.urls.GetVehicleByRentalPoint, data)
  }
  // GetREntalPointByRegion(data: GetREntalPointService): Observable<any> {
  //   return this.http.post<any>(environment.urls.GetVehicleByRentalPoint, data)
  // }
  BookVehicleFsq(data: BookVehicleService): Observable<any> {
    return this.http.post<any>(environment.urls.BookVehicleUrl, data)
  }
  getAssignVehicle(data: FSQShiftManagementId): Observable<any> {
    return this.http.post<any>(environment.urls.getAssignVehicleUrl, data)
  }
  FsqStartShift(data: startShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FSQStartShiftUrl, data)
  }
  FsqPauseShift(data: PauseShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FsqPauseShiftUrl, data)
  }
  FsqResumeShift(data: PauseShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FsqResumeShiftUrl, data)
  }
  FsqEndShift(data: EndShiftService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.FsqEndShiftUrl, data)
  }
  GetFsqAllHub(): Observable<FsqAllHub> {
    return this.http.get<FsqAllHub>(environment.urls.GetFsqHub)
  }
  UpdateFsq(data: EditHubLevel): Observable<any> {
    return this.http.post<any>(environment.urls.EditFsqHubLevel, data)
  }
    //Strat Job
    FsqStartJob(data: AcceptJob): Observable<any> {
      return this.http.post<any>(environment.urls.FsqStartJob, data);
    }
  //fsqReturn Vehicle
  FsqReturnVehicle(data: FsqReturnVehicleService): Observable<any> {
    return this.http.post<any>(environment.urls.FsqReturnVehicleUrl, data)
  }
  //get Return RP
  GetReturnRP(data: ReturnVehicleService): Observable<any> {
    return this.http.post<any>(environment.urls.GetReturnRPUrl, data);
  }
  //get Return Region
  GetReturnRegion(data: ReturnVehicleService): Observable<any> {
    return this.http.post<any>(environment.urls.GetReturnRegionUrl, data);
  }
  SearchActiveFsq(search_string: string) {
    return this.http.post<any>(environment.urls.SearchActiveFsqUrl, { search_string: search_string });
  }
   getRentalpointsByRegion(data: ReturnVehicleService): Observable<any> {
    return this.http.post(environment.urls.RentalpointsByRegion, data);
  }
// Get Region By City
  getRegionbyCity(data: FsqRegionByCity): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.getRegionbyCityUrl, data)
  }

  taskDetailsList(work_item_task_id: number): Observable<any> {
    return this.http.post(environment.urls.taskDetailsListUrl, {work_item_task_id: work_item_task_id});
  }
}
