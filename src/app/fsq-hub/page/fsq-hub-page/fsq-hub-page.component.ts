import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-fsq-hub-page',
  templateUrl: './fsq-hub-page.component.html',
  styleUrls: ['./fsq-hub-page.component.scss']
})
export class FsqHubPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
