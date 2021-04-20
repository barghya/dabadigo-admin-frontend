import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferRequestLoadPayload, TransferRequestCreatePayload, TransferRequestActionPayload } from 'src/app/models/transferpartsModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferPartsService {

  constructor(private http: HttpClient) { }

  getAllTransferRequests(data: TransferRequestLoadPayload): Observable<any> {
    return this.http.post(environment.urls.getTransferRequestsUrl, data);
  }

  createTransferRequest(data: TransferRequestCreatePayload): Observable<any> {
    return this.http.post(environment.urls.createTransferRequestUrl, data);
  }

  approveTransferRequest(data: TransferRequestActionPayload): Observable<any> {
    return this.http.post(environment.urls.approveTransferRequestUrl, data);
  }

  rejectTransferRequest(data: TransferRequestActionPayload): Observable<any> {
    return this.http.post(environment.urls.rejectTransferRequestUrl, data);
  }

  deleteTransferRequest(data: TransferRequestActionPayload): Observable<any> {
    return this.http.post(environment.urls.deleteTransferRequestUrl, data);
  }
}
