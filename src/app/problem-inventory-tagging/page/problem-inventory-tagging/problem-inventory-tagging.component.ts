import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-problem-inventory-tagging',
  templateUrl: './problem-inventory-tagging.component.html',
  styleUrls: ['./problem-inventory-tagging.component.scss']
})
export class ProblemInventoryTaggingComponent implements OnInit {

  constructor( public languageService: LanguageService ) { }

  ngOnInit() {
  }

}
