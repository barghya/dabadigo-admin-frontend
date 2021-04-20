import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { accessory, parts, battery, adminDevice, addDevice, Assets, batteryID, editDevice, countries, deviceId, AddParts, partID, AddAsset, editAsset, editAssetLoad, assetID, PartsMasterItem, PartsTransactionsFilter, AddPartsStockPayload, PartsDefinitionLoadPayload, PartsDefinitionUpdatePayload, getAssetDetails} from 'src/app/models/asset-inventoryModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetInventoryService {

  constructor(private http: HttpClient) { }

  GetAccessoriesList(): Observable<accessory[]> {
    return this.http.get<accessory[]>(environment.urls.AccessoryListURL);
  }

  //Battery
  GetBatteryList(): Observable<battery[]> {
    return this.http.get<battery[]>(environment.urls.BatteryListURL);
  }

  CreateBattery(data: battery): Observable<any> {
    return this.http.post<any>(environment.urls.CreateBatteryURL, data);
  }

  UpdateBattery(data: battery): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.updateBatteryURL, data);
  }

  DeleteBattery(data: batteryID): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.DeleteBatteryURL, data);
  }

  DuplicateBatteryTagURL(value: string): Observable<any> {
    return this.http.post<any>(environment.urls.DuplicateBatteryTagURL, {battery_tag : value});
  }

  GetBatteryByID(data: batteryID): Observable<any> {
    return this.http.post<any>(environment.urls.GetBatterybyIDURL, data);
  }

  GetBatteryTransactions(battery_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.GetBatteryTransactionsUrl, {battery_id: battery_id});
  }
  //Device
  AddDeviceList(data: addDevice): Observable<any>{
    return this.http.post<any>(environment.urls.AddDeviceListURL, data);
  }

  DeleteDevice(data:deviceId): Observable<any> {
    console.log('service data',data);
    return this.http.post<any>(environment.urls.DeleteDeviceURL, data);
  }
  
  EditDevice(data: adminDevice): Observable<any>{
    return this.http.put<any>(environment.urls.EditDeviceURL, data);
  }
  
  GetDeviceByID(data: editDevice): Observable<any>{
    return this.http.post<any>(environment.urls.EditDeviceLoadURL, data);
  }

  GetDeviceList(): Observable<adminDevice[]>{
    return this.http.get<adminDevice[]>(environment.urls.DeviceListURL); 
  }

  GetDeviceTransactionUrl(device_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.GetDeviceTransactionsUrl, {device_id: device_id});
  }
  
  //Countries
  GetCountries():Observable<countries[]>{
    return this.http.get<countries[]>(environment.urls.GetCountriesURL);
  }
  DuplicateDevice(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateDevice, {device_code : value});
  }
  DuplicateImeiNumber(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateImeiNumber, {device_imei : value});
  }

  // Parts Service
  GetPartsList(): Observable<parts[]> {
    return this.http.get<parts[]>(environment.urls.PartsListURL);
  }
  CreatePart(data:AddParts):Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.CreatePartsURL, data);
  }
  GetPartByID(data:partID): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.EditPartById, data)
  }
  EditPart(data:parts): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.UpdatePartsURL, data)
  }

  deletePart(data: partID): Observable<any> {
    return this.http.post(environment.urls.deletePartUrl, data);
  }
  
  duplicatePart(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateParts, {part_code : value});
  }

  //Asset Services
  GetAssetList(): Observable<Assets[]>{
    return this.http.get<Assets[]>(environment.urls.AssetListURL);
  }
  duplicateAssetcode(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateAsset, {vehicle_assetcode : value});
  }
  duplicateVehicleID(value: string): Observable<any> {
    console.log(value);
    return this.http.post<any>(environment.urls.DuplicateVehicleID, {vehicle_idnumber : value});
  }

  AddAssetList(data: AddAsset): Observable<any>{
    return this.http.post<any>(environment.urls.AddAssetURL, data);
  }

  GetAssetByID(data: editAsset): Observable<any> {
    return this.http.post<any>(environment.urls.EditAssetLoadUrl,data);
  }

  GetAssetDetailById(data: getAssetDetails): Observable<any> {
    return this.http.post<any>(environment.urls.GetAssetDetailByIdUrl, data);
  }
  
  GetAvailableBattery(vehicle_id: number = null): Observable<any> {
    return this.http.post<any>(environment.urls.AvailableBatteriesUrl, { vehicle_id: vehicle_id });
  }

  GetAvailableDevices(vehicle_id: number = null): Observable<any> {
    return this.http.post<any>(environment.urls.AvailableDevicesUrl, { vehicle_id: vehicle_id });
  }

  GetAvailableParts(vehicle_id: number = null): Observable<any> {
    return this.http.post<any>(environment.urls.AvailablePartsUrl, { vehicle_id: vehicle_id });
  }
  EditAsset(data:editAssetLoad): Observable<any> {
    console.log(data);
    return this.http.put<any>(environment.urls.UpdateAssetsURL, data)
  }
  //End

  //Parts Master Section
  getPartsMasterList(): Observable<PartsMasterItem[]> {
    return this.http.get<PartsMasterItem[]>(environment.urls.partsMasterListUrl);
  }
  getPartsMasterWithStockList(): Observable<PartsMasterItem[]> {
    return this.http.get<PartsMasterItem[]>(environment.urls.partsMasterWithStockListUrl);
  }
  getSinglePartsMaster(parts_master_id: number): Observable<any> {
    return this.http.post(environment.urls.singlePartsMasterUrl, { parts_master_id: parts_master_id });
  }
  createPartsMaster(data: PartsMasterItem): Observable<any> {
    return this.http.post(environment.urls.partsMasterCreateUrl, data);
  }
  updatePartsMaster(data: PartsMasterItem): Observable<any> {
    return this.http.post(environment.urls.partsMasterUpdateUrl, data);
  }
  checkDuplicatePartsMaster(part_tag: string): Observable<any> {
    return this.http.post(environment.urls.partsMasterCheckDuplicateUrl, { part_tag: part_tag });
  }
  checkDuplicatePartsMasterCode(part_short_code: string): Observable<any> {
    return this.http.post(environment.urls.partsMasterCheckDuplicateCodeUrl, { part_short_code: part_short_code });
  }
  deletePartsMaster(parts_master_id: number): Observable<any> {
    return this.http.post(environment.urls.partsMasterDeleteUrl, { parts_master_id: parts_master_id });
  }
  getPartsStockFiltered(parts_master_id?: number): Observable<any> {
    var id = !!parts_master_id ? parts_master_id : null;
    return this.http.post(environment.urls.partsStockFilteredUrl, { parts_master_id: id });
  }
  partsStocksAdd(data: AddPartsStockPayload): Observable<any> {
    return this.http.post(environment.urls.addPartsStockUrl, data);
  }
  getPartsTransactions(data?: PartsTransactionsFilter): Observable<any> {
    return this.http.post(environment.urls.partsTrasnactionsUrl, data);
  }
  getPartsDefinitionByVehicleType(data: PartsDefinitionLoadPayload): Observable<any> {
    return this.http.post(environment.urls.getPartsDefinitionByVehicleTypeUrl, data);
  }
  updatePartsDefinition(data: PartsDefinitionUpdatePayload): Observable<any> {
    return this.http.post(environment.urls.updatePartsDefinitionUrl, data);
  }
}
