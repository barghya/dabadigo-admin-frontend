import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-customer-kyc-verification',
  templateUrl: './customer-kyc-verification.component.html',
  styleUrls: ['./customer-kyc-verification.component.scss']
})
export class CustomerKycVerificationComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
