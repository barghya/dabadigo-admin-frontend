import { Component, OnInit } from '@angular/core';
import { NavLinks } from 'src/app/models/roleManagementModel';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  constructor(public languageService: LanguageService) { }
  navLinks: NavLinks[] = [
    {
      label: "Role Permission",
      link: "role-management-main"
    },
    {
      label: "User Type Role",
      link: "user-type-role"
    },
   
  ];

  ActiveTab: number = 0;
  ngOnInit() {
  }

}
