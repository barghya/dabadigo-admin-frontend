import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userType } from 'src/app/models/userManagement';
import { DomainData } from 'src/app/models/domainModel';
import { assetType } from 'src/app/models/asset-inventoryModel';
import { deviceStatus } from 'src/app/models/asset-inventoryModel';
import { domainType } from 'src/app/models/corporateManagement';
import { error_repo } from 'src/app/models/errorModel';
import { dummydeviceStatus } from 'src/app/models/iotControllereModel';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private http: HttpClient) { }
  //User
  GetUserType(): Observable<any>{
    var data:userType = {
      domain_type: "user_type"
    }
    return this.http.post<any>(environment.urls.GetUserTypeURL, data);
  }
 //Asset & Inventory
  GetBatteryStatus(): Observable<any>{
    var data: assetType = {
      domain_type: "battery_state"
    }
    return this.http.post<any>(environment.urls.BatteryStatusURL, data);
  }
  GetDeviceStatus(): Observable<any>{
    var data:deviceStatus ={
      domain_type: "device_status"
    }
    return this.http.post<any>(environment.urls.DeviceStatusURL, data);
  }
  
  GetVehiclePartState(): Observable<any>{
    var data:assetType = {
      domain_type: "vehicle_parts_state"
    }
    return this.http.post<any>(environment.urls.VehiclePartStatesURL, data);
  }
  GetVehicleTypes(): Observable<any> {
    var data = {
      domain_type: "vehicle_type"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetOwnershipTypes(): Observable<any> {
    var data = {
      domain_type: "ownership_type"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetPricingTypes(): Observable<any> {
    var data = {
      domain_type: "price_table_type"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
    
  }
  GetUserStatus(): Observable<any> {
    var data = {
      domain_type: "user_status"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }
  GetVehicleStatus(): Observable<any> {
    var data = {
      domain_type: "vehicle_status"
    }
    return this.http.post(environment.urls.DomainLookupUrl, data);
  }
  //Corporate
  GetPartnerType(): Observable<any>{
    var data:domainType = {
      domain_type: "partner_type"
    }
    return this.http.post(environment.urls.GetUserTypeURL, data);
  }

  GetPartnerCategory(): Observable<any>{
    var data:domainType = {
      domain_type: "partner_category"
    }
    return this.http.post(environment.urls.GetUserTypeURL, data);
  }

  GetCorporateSize(): Observable<any>{
    var data:domainType = {
      domain_type: "corporate_size"
    }
    return this.http.post(environment.urls.GetUserTypeURL, data);
  }

  GetCorporateContract(): Observable<any>{
    var data:domainType = {
      domain_type: "corporate_contract"
    }
    return this.http.post(environment.urls.GetUserTypeURL, data);
  }

  GetBilling(): Observable<any>{
    var data:domainType = {
      domain_type: "billing_type"
    }
    return this.http.post(environment.urls.GetUserTypeURL, data);
  }

  GetPaymentTerm(): Observable<any>{
    var data:domainType = {
      domain_type: "corporate_payment_term"
    }
    return this.http.post(environment.urls.DomainLookupUrl, data)
  }
  //Corporate Code
  GetCodeStatus(): Observable<any> {
    var data:domainType = {
      domain_type: "corporate_codestatus"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetCodeType(): Observable<any> {
    var data: domainType = {
      domain_type: "corporate_codetype"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.GetUserTypeURL, data);
  }
  //Coupon Management
  GetCouponType(): Observable<any> {
    var data: domainType = {
      domain_type: "coupon_type"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetCouponUsageRestriction(): Observable<any> {
    var data: domainType = {
      domain_type: "coupon_usage_restriction"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetCouponDiscountType(): Observable<any> {
    var data: domainType = {
      domain_type: "coupon_discount_type"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetTaxType(): Observable<any> {
    var data: domainType = {
      domain_type: "tax_type"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetErrorFramework(): Observable<error_repo[]> {
    return this.http.get<error_repo[]>(environment.urls.GetErrorFrameworkUrl);
  }

  // FSQ Hub
  GetFSQHubRegionStatus(): Observable<any> {
    var data = {
      domain_type: "hub_region_status"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetFSQHubManagerStatus(): Observable<any> {
    var data = {
      domain_type: "hub_manager_status"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetFSQHubStatus(): Observable<any> {
    var data = {
      domain_type: "hub_status"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetStoreTypes(): Observable<any> {
    var data = {
      domain_type: "store_type"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetPartStatus(): Observable<any> {
    var data = {
      domain_type: "part_status"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }
  GetAllFsqLevel(): Observable<any> {
    var data = {
      domain_type: "fsq_skill_level"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetProblemStatus(): Observable<any> {
    var data = {
      domain_type: "problem_status"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetFsqSkillLevels(): Observable<any> {
    var data = {
      domain_type: "fsq_skill_level"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetBillingStatuses(): Observable<any> {
    var data = {
      domain_type: "corporate_bill_status"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  // Demo Device
  GetdemoDeviceStatus(): Observable<any>{
    var data:dummydeviceStatus ={
      domain_type: "device_status"
    }
    console.log(data);
    return this.http.post<any>(environment.urls.DemoDeviceStatusURL, data);
  }
  
  GetPermissionType(): Observable<any> {
    var data = {
      domain_type: "permission_code"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }

  GetusertypenameType(): Observable<any> {
    var data = {
      domain_type: "user_type"
    }

    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }
  GetItemType(): Observable<any> {
    var data = {
      domain_type: "item_type"
    }
    return this.http.post<any>(environment.urls.DomainLookupUrl, data);
  }


  GetFranchiseeBillingStatus(): Observable<any> {
    var data = {
      domain_type: "franchise_payment_status",
    }
    return this.http.post<any>(environment.urls.FranchiseePaymentStatusUrl, data);
  }

  GetDeviceModels(): Observable<any> {
    var data = {
      domain_type: "device_model",
    }
    return this.http.post<any>(environment.urls.FranchiseePaymentStatusUrl, data);
  }

}
