import { Component, OnInit, Input } from '@angular/core';
import { CorporateDetails } from 'src/app/models/corporateBillingModel';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-basic-details',
  templateUrl: './corporate-basic-details.component.html',
  styleUrls: ['./corporate-basic-details.component.scss']
})
export class CorporateBasicDetailsComponent implements OnInit {

  @Input() corporateDetails : CorporateDetails;
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
