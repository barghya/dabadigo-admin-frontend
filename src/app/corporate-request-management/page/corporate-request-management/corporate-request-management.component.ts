import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-request-management',
  templateUrl: './corporate-request-management.component.html',
  styleUrls: ['./corporate-request-management.component.scss']
})
export class CorporateRequestManagementComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
