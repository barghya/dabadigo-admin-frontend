import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-franchise-management-trip-page',
  templateUrl: './franchise-management-trip-page.component.html',
  styleUrls: ['./franchise-management-trip-page.component.scss']
})
export class FranchiseManagementTripPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
