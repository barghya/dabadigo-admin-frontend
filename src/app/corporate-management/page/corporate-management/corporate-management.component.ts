import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-management',
  templateUrl: './corporate-management.component.html',
  styleUrls: ['./corporate-management.component.scss']
})
export class CorporateManagementComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
