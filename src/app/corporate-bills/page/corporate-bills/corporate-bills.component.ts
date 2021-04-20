import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-corporate-bills',
  templateUrl: './corporate-bills.component.html',
  styleUrls: ['./corporate-bills.component.scss']
})
export class CorporateBillsComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
