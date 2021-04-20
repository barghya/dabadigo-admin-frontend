import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-franchise-pricing',
  templateUrl: './franchise-pricing.component.html',
  styleUrls: ['./franchise-pricing.component.scss']
})
export class FranchisePricingComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
