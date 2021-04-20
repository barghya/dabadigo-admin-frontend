import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { NavLinks } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-maintenance-jobs',
  templateUrl: './maintenance-jobs.component.html',
  styleUrls: ['./maintenance-jobs.component.scss']
})
export class MaintenanceJobsComponent implements OnInit {
  navLinks: NavLinks[] = [
    {
      label: "Maintenance Jobs",
      link: "maintenance-jobs-main"
    },
    {
      label: "Maintenance Schedule",
      link: "maintenance-schedule"
    }
  ];

  ActiveTab: number = 0;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
