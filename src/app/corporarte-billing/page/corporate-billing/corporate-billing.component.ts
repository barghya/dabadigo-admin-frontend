import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-billing',
  templateUrl: './corporate-billing.component.html',
  styleUrls: ['./corporate-billing.component.scss']
})
export class CorporateBillingComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
