import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-transfer-parts',
  templateUrl: './transfer-parts.component.html',
  styleUrls: ['./transfer-parts.component.scss']
})
export class TransferPartsComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
