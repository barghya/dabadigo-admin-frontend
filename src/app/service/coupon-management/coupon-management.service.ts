import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { couponManagement, singleCoupon, Referrals } from 'src/app/models/couponManagementModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponManagementService {

  constructor(private http: HttpClient) { }
  
  //Coupon List Load
  getCouponList(): Observable<couponManagement[]> {
    return this.http.get<couponManagement[]>(environment.urls.getCouponsUrl)
  }
  //Create Coupon
  createCoupon(data: couponManagement): Observable<any> {
    return this.http.post<any>(environment.urls.createCouponsUrl, data)
  }

  //Get coupon by ID
  getCouponByID(data: singleCoupon): Observable<any> {
    return this.http.post<any>(environment.urls.getCouponsByIdUrl, data)
  }

  //Edit Coupon
  updateCoupon(data: couponManagement): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.updateCouponsUrl, data)
  }

  //Duplicate Check
  duplicateCouponCode(data: string): Observable<any> {
    return this.http.post<any>(environment.urls.duplicateCouponCodeUrl, { coupon_code: data });
  }

  //Delete Coupon
  deleteCoupon(data: singleCoupon): Observable<any> {
    return this.http.post<any>(environment.urls.deleteCoupon, data);
  }

  assignCoupon(data: couponManagement): Observable<any> {
    return this.http.post<any>(environment.urls.assignCouponUrl, data);
  }

  getUserList(data: singleCoupon): Observable<any> {
    return this.http.post<any>(environment.urls.getUserListUrl, data);
  }

  getUsageHistory(data: singleCoupon): Observable<any> {
    return this.http.post<any>(environment.urls.getUsageHistoryUrl, data);
  }

  getReferralList(): Observable<Referrals[]> {
    return this.http.get<Referrals[]>(environment.urls.getReferralListUrl)
  }
}
