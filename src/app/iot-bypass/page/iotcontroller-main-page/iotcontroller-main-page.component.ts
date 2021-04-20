import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { NavLinks } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-iotcontroller-main-page',
  templateUrl: './iotcontroller-main-page.component.html',
  styleUrls: ['./iotcontroller-main-page.component.scss']
})
export class IotcontrollerMainPageComponent implements OnInit {

  constructor(public languageService: LanguageService) { }
  navLinks: NavLinks[] = [
    {
      label: "DEVICE BYPASS",
      link: "device-bypass"
    },
    {
      label: "ACTION",
      link: "action-main"
    },
    {
      label: "DEMO DEVICE",
      link: "demo-device"
    }
  ];

  ActiveTab: number = 0;
  ngOnInit() {
  }

}
