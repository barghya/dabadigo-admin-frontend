import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporateRequestDetail } from 'src/app/models/corporateRequestManagementModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-corporate-request-detail',
  templateUrl: './corporate-request-detail.component.html',
  styleUrls: ['./corporate-request-detail.component.scss']
})
export class CorporateRequestDetailComponent implements OnInit {

  @Input() requestDetail$: Observable<CorporateRequestDetail>;

  @Output() approve = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  Approve() {
    this.requestDetail$.pipe(take(1)).subscribe(
      requestDetail => {
        this.approve.emit(requestDetail.corporate_customer_id);
      }
    )
  }

  Cancel() {

  }

  Reject() {
    this.requestDetail$.pipe(take(1)).subscribe(
      requestDetail => {
        this.reject.emit(requestDetail.corporate_customer_id);
      }
    )
  }

}
