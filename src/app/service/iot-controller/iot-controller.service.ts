import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionMainDetails, TripUuid, TripStart, PauseResumeService, EndTripService, getSlotService, SlotBookingService, DeviceDetails, Bypass, IotControllerDetails, TripCancel, cancelSlot, DemoDeviceDetails, addDemoDevice, countries, editDemoDevice, editDummyDevice } from 'src/app/models/iotControllereModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IotControllerService {
  

  constructor(private http: HttpClient) { }

  getActionMainList(): Observable<ActionMainDetails[]> {
    return this.http.get<ActionMainDetails[]>(environment.urls.getActionmainListUrl);
  }

  GetMoreActionDetails(data: TripUuid): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.GetMoreActionDetailsUrl, data)
  }

  CancelTrip(data: TripCancel): Observable<any>{
    console.log(data); 
    return this.http.post<any>(environment.urls.cancelTripUrl, data);
  }


  tripStart(data: TripStart): Observable<any>{
    return this.http.post<any>(environment.urls.startTripUrl, data);
  }

  PauseTrip(data: PauseResumeService): Observable<any>{
    console.log(data); 
    return this.http.post<any>(environment.urls.PauseRideUrl, data);
  }

  ResumeTrip(data: PauseResumeService): Observable<any>{
    console.log(data);
    return this.http.post<any>(environment.urls.ResumeRideUrl, data);
  }

  GetSlot(data: getSlotService): Observable<any>{
    console.log(data);
    return this.http.post<any>(environment.urls.GetSlotUrl, data);
  }

  SlotBookingRequest(data: SlotBookingService): Observable<any>{
    console.log(data);
    return this.http.post<any>(environment.urls.SlotBooking, data);  
  }

  Cancelslot(data: cancelSlot): Observable<any>{
    console.log(data); 
    return this.http.post<any>(environment.urls.cancelSlotUrl, data);
  }

  EndTrip(data: EndTripService): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.EndTripUrl, data);
  }

  getActiveDeviceList(): Observable<DeviceDetails[]> {
    return this.http.get<DeviceDetails[]>(environment.urls.getActiveDeviceListUrl);
  }

  GetBypassDetails(data: IotControllerDetails): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.GetBypassDetailsUrl, data)
  }

  addBypass(data: Bypass): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.addBypassUrl, data)
  }

  getdemoDeviceList(): Observable<DemoDeviceDetails[]> {
    return this.http.get<DemoDeviceDetails[]>(environment.urls.getDemoDeviceListUrl);
  }

AddDemoDeviceList(data: addDemoDevice): Observable<any>{
  return this.http.post<any>(environment.urls.AddDemoDeviceListURL, data);
}

EditDemoDeviceList(data: editDummyDevice): Observable<any>{
  return this.http.post<any>(environment.urls.EditDemoDeviceListURL, data);
}

DuplicateDevice(value: string): Observable<any> {
  console.log(value);
  return this.http.post<any>(environment.urls.DuplicateDevice, {device_code : value});
}
DuplicateImeiNumber(value: string): Observable<any> {
  console.log(value);
  return this.http.post<any>(environment.urls.DuplicateImeiNumber, {device_imei : value});
}

GetCountries():Observable<countries[]>{
  return this.http.get<countries[]>(environment.urls.GetCountriesURL);
}

getByIdDemoDevice(data: editDemoDevice): Observable<any>{
  return this.http.post<any>(environment.urls.getByIdDemoDeviceURL, data);
}

}
