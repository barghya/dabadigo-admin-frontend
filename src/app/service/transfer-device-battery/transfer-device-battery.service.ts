import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetItemService, deployDevicebatteryRequest, SingleRequest, multiTransferService, GetDeployItemListService } from 'src/app/models/transferDeviceBatteryModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferDeviceBatteryService {

  constructor(private http: HttpClient) { }

  getAllItems(data: GetItemService): Observable<any> {
    return this.http.post<any>(environment.urls.GetItemLoadUrl, data);
  }
  createTransferRequest(data: deployDevicebatteryRequest): Observable<any> {
    return this.http.post<any> (environment.urls.CreateBatteryAndDeviceTransferRquest, data)
  }
  GetAllTransferRequestList(data: GetDeployItemListService): Observable<any> {
    return this.http.post<any> (environment.urls.GetAllTransferRequestListUrl, data)
  }
  GetSingleTransferRequestList(data: SingleRequest): Observable<any> {
    return this.http.post<any> (environment.urls.GetSingleTransferRequestListUrl, data)
  }
  multiTransfer(data: multiTransferService): Observable<any> {
    return this.http.post<any> (environment.urls.MultiTransferUrl, data)
  }
}
