import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-fsq-request-page',
  templateUrl: './fsq-request-page.component.html',
  styleUrls: ['./fsq-request-page.component.scss']
})
export class FsqRequestPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
