import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-point',
  templateUrl: './rental-point.component.html',
  styleUrls: ['./rental-point.component.scss']
})
export class RentalPointComponent implements OnInit {

  constructor(public languageService: LanguageService, private router: Router) { }

  ngOnInit() {
  }

}
