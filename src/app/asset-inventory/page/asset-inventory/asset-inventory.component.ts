import { Component, OnInit } from '@angular/core';
import { NavLinks } from 'src/app/models/asset-inventoryModel';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-asset-inventory',
  templateUrl: './asset-inventory.component.html',
  styleUrls: ['./asset-inventory.component.scss']
})
export class AssetInventoryComponent implements OnInit {

  navLinks: NavLinks[] = [
    {
      label: "ASSET",
      link: "assets-main"
    },
    {
      label: "BATTERY",
      link: "battery-main"
    },
    {
      label: "DEVICE",
      link: "device-main"
    },
    // {
    //   label: "ACCESSORIES",
    //   link: "accessories-main"
    // },
    {
      label: "PARTS",
      link: "parts-master-main"
    },
    // {
    //   label: "PARTS",
    //   link: "part-main"
    // }
  ];

  ActiveTab: number = 0;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
