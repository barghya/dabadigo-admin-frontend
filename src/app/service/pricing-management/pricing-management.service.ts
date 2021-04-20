import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PricingItem, BatteryswapPricingItem } from 'src/app/models/pricingManagement';

@Injectable({
  providedIn: 'root'
})
export class PricingManagementService {

  constructor(private http: HttpClient) { }

  getPricingList(): Observable<PricingItem[]> {
    return this.http.get<PricingItem[]>(environment.urls.pricingListUrl);
  }

  addPricing(data: PricingItem): Observable<any> {
    return this.http.post<any>(environment.urls.pricingAddUrl, data);
  }

  editPricing(data: PricingItem): Observable<any> {
    return this.http.post<any>(environment.urls.pricingEditUrl, data);
  }

  deletePricing(price_table_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.pricingDeleteUrl, { price_table_id: price_table_id });
  }

  getSinglePricing(price_table_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.singlePricingUrl, { price_table_id: price_table_id });
  }

  // getbatteryswapPricingList(): Observable<BatteryswapPricingItem[]> {
  //   return this.http.get<PricingItem[]>(environment.urls.batteryswappricingListUrl);
  // }
  getbatterySwappricingList(): Observable<BatteryswapPricingItem[]> {
    return this.http.get<BatteryswapPricingItem[]>(environment.urls.batteryswappricingListUrl);
  }

  addbatteryswapPricing(data: BatteryswapPricingItem): Observable<any> {
    return this.http.post<any>(environment.urls.batteryswappricingAddUrl, data);
  }

  getSinglebatteryswapPricing(batteryswap_price_table_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.singlebatteryswapPricingUrl, { batteryswap_price_table_id: batteryswap_price_table_id });
  }

  editbatteryswapPricing(data: BatteryswapPricingItem): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.batteryswappricingEditUrl, data);
  }

  deletebatteryswapPricing(batteryswap_price_table_id: number): Observable<any> {
    return this.http.post<any>(environment.urls.batteryswappricingDeleteUrl, { batteryswap_price_table_id: batteryswap_price_table_id });
  }
}
