import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { NavLinks } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-deploy-vehicle',
  templateUrl: './deploy-vehicle.component.html',
  styleUrls: ['./deploy-vehicle.component.scss']
})
export class DeployVehicleComponent implements OnInit {

  constructor(public languageService: LanguageService) { }
  ngOnInit() {
  }

}
