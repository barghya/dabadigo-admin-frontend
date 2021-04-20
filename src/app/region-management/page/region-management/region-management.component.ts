import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-management',
  templateUrl: './region-management.component.html',
  styleUrls: ['./region-management.component.scss']
})
export class RegionManagementComponent implements OnInit {
  checked = false;
  color = "primary";
  constructor(public languageService: LanguageService,private router: Router) { }

  ngOnInit() {

  }
 

}
