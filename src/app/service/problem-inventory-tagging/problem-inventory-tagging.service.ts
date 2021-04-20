import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetProblemByCodeService, ProblemDetails, ProblemTaggedDetails } from 'src/app/models/problem-inventory-taggingModel';

@Injectable({
  providedIn: 'root'
})
export class ProblemInventoryTaggingService {

  constructor(private http: HttpClient) { }

  getProblembyCode(data: GetProblemByCodeService ): Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.urls.GetProblemByCode, data);
  }

  getAllproblems(): Observable<ProblemDetails[]> {
    return this.http.get<ProblemDetails[]>(environment.urls.GetAllProblems)
  }

  updateProblemInventoryTagging(data: ProblemTaggedDetails): Observable<any> {
    return this.http.post<any>(environment.urls.updateProblemInventoryTagging, data)
  }
}
