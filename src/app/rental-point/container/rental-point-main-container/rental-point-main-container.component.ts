import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalPoint, RpId, AvailableFranchise } from 'src/app/models/rentalPoint';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { RentalPointLoadAction, DeleteRentalPointAction, GetRentalPointHistoryAction } from 'src/app/store/actions/rental_point.action';
import { Router } from '@angular/router';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-rental-point-main-container',
  templateUrl: './rental-point-main-container.component.html',
  styleUrls: ['./rental-point-main-container.component.scss']
})
export class RentalPointMainContainerComponent implements OnInit {

  rentalpoint_det: Observable<RentalPoint[]>
  rentalpoint_ownership$: Observable<DomainData[]>
  franchise$: Observable<AvailableFranchise[]>
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch( new RentalPointLoadAction());
    this.rentalpoint_det = this.store.select(state => state.rental_point.RentalPoints);
    this.rentalpoint_ownership$ = this.store.select(state => state.rental_point.ownership_code);
    this.franchise$= this.store.select(state=> state.rental_point.franchise);
  }

  naviGate() {
    console.log('form rental point container');
    this.router.navigate(['rental-point', 'add-rental-point']);
  }

  deleterentalpoint(id: RpId) {
    console.log('rp id container: ', id);
    this.store.dispatch(new DeleteRentalPointAction(id));
  }

  moveRentalPoint(id: number) {
    this.router.navigate(['rental-point', 'move-rental-point', id]);
  }

  rentaiPointHistory(id: number) {
    var data: RpId = {
      rentalpoint_id: id
    };
    this.store.dispatch(new GetRentalPointHistoryAction(data));
    this.router.navigate(['rental-point', 'rental-point-history', id]);
  }

  editrentalPoint(rentalpoint_id:number) {
    this.router.navigate(['rental-point', 'edit-rental-point', rentalpoint_id]);
  }
  
}
