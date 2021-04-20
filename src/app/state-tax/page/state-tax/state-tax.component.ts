import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-state-tax',
  templateUrl: './state-tax.component.html',
  styleUrls: ['./state-tax.component.scss']
})
export class StateTaxComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
