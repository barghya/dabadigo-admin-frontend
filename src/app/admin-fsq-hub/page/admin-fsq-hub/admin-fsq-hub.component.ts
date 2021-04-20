import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-admin-fsq-hub',
  templateUrl: './admin-fsq-hub.component.html',
  styleUrls: ['./admin-fsq-hub.component.scss']
})
export class AdminFsqHubComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
