import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-coupon-basic-details',
  templateUrl: './coupon-basic-details.component.html',
  styleUrls: ['./coupon-basic-details.component.scss']
})
export class CouponBasicDetailsComponent implements OnInit {
  @Input() couponData$: Observable<any>;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
