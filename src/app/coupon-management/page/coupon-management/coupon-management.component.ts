import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Router } from '@angular/router';
import { NavLinks } from 'src/app/models/asset-inventoryModel';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.scss']
})
export class CouponManagementComponent implements OnInit {

  checked = false;
  color = "primary";

  navLinks: NavLinks[] = [
    {
      label: "Coupons",
      link: "coupon-list",
    },
    {
      label: "Referral",
      link: "referral-main",
    }
  ];

  ActiveTab: number = 0;

  constructor(public languageService: LanguageService, private router: Router) { }

  ngOnInit() {
  }

}
