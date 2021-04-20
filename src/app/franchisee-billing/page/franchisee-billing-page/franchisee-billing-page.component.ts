import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-franchisee-billing-page',
  templateUrl: './franchisee-billing-page.component.html',
  styleUrls: ['./franchisee-billing-page.component.scss']
})
export class FranchiseeBillingPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
