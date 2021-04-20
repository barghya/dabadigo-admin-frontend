import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-franchise-rental-point-page',
  templateUrl: './franchise-rental-point-page.component.html',
  styleUrls: ['./franchise-rental-point-page.component.scss']
})
export class FranchiseRentalPointPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
