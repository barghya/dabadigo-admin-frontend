import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-parameter-management',
  templateUrl: './parameter-management.component.html',
  styleUrls: ['./parameter-management.component.scss']
})
export class ParameterManagementComponent implements OnInit {

  constructor(public languageService: LanguageService ) { }

  ngOnInit() {
  }

}
