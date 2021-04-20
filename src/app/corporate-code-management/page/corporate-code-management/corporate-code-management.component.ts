import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-code-management',
  templateUrl: './corporate-code-management.component.html',
  styleUrls: ['./corporate-code-management.component.scss']
})
export class CorporateCodeManagementComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
