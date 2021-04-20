import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FranchisePricingItem } from 'src/app/models/franchisePricingModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FranchisePricingService {

  constructor(private http: HttpClient) { }

  getFranchisePricingList(): Observable<FranchisePricingItem[]> {
    return this.http.get<FranchisePricingItem[]>(environment.urls.getfranchisepricingListUrl);
  }
}
