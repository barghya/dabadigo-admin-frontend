import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporateDetails } from 'src/app/models/corporateBillingModel';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-view-bill-corporate-legal-details',
  templateUrl: './view-bill-corporate-legal-details.component.html',
  styleUrls: ['./view-bill-corporate-legal-details.component.scss']
})
export class ViewBillCorporateLegalDetailsComponent implements OnInit {

  @Input() corporateDetails : CorporateDetails;
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }
}
