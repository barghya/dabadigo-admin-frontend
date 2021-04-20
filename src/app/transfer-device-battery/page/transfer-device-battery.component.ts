import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-transfer-device-battery',
  templateUrl: './transfer-device-battery.component.html',
  styleUrls: ['./transfer-device-battery.component.scss']
})
export class TransferDeviceBatteryComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
