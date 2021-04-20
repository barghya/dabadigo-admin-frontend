import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-franchise-bills',
  templateUrl: './franchise-bills.component.html',
  styleUrls: ['./franchise-bills.component.scss']
})
export class FranchiseBillsComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
