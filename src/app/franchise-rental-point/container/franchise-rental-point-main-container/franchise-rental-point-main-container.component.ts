import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalPoint, RpId, GetRp } from 'src/app/models/franchiseRentalPointModel';
import { SubSink } from 'subsink';
import { FranchiseRentalPointLoadAction, GetFranchiseRentalPointHistoryAction } from 'src/app/store/actions/franchise_management.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-franchise-rental-point-main-container',
  templateUrl: './franchise-rental-point-main-container.component.html',
  styleUrls: ['./franchise-rental-point-main-container.component.scss']
})
export class FranchiseRentalPointMainContainerComponent implements OnInit {
  rentalpoint_det: Observable<GetRp[]>
  subs = new SubSink();
  constructor(private store: Store<AppState>, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.store.select(state => state.user.userdetail.admn_user_id).subscribe(
      admn_user_id => {
        this.store.dispatch(new FranchiseRentalPointLoadAction(admn_user_id));
      }
    ))
    this.rentalpoint_det = this.store.select(state => state.franchisee_rental_point.RentalPoints);

  }
  rentaiPointHistory(id: number) {
    var data: RpId = {
      rentalpoint_id: id
    };
    this.store.dispatch(new GetFranchiseRentalPointHistoryAction(data));
    this.router.navigate(['franchise-rental-point', 'franchise-rental-point-details', id]);
  }
}
