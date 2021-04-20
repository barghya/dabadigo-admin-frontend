import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { CorporateManagementLoadAction } from 'src/app/store/actions/corporate_management.action';
import { Observable } from 'rxjs';
import { CorporateManagement, AddUserService } from 'src/app/models/corporateManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-corporate-management-main-container',
  templateUrl: './corporate-management-main-container.component.html',
  styleUrls: ['./corporate-management-main-container.component.scss']
})
export class CorporateManagementMainContainerComponent implements OnInit {

  corporate_det$: Observable<CorporateManagement[]>;
  partnerType$ : Observable<DomainData[]>
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new CorporateManagementLoadAction());
    this.corporate_det$ = this.store.select(state => state.corporate_management.corporateManagement);
    this.partnerType$ = this.store.select(state => state.corporate_management.partner_type);
  }

  openCorporate() {
    this.router.navigate(['corporate-management', 'corporate-management-add'])
  }

  editCorporate(value: number) {
    console.log('Edit methodaaaa: ',value);
    this.router.navigate(['corporate-management', 'edit-corporate', value]);
  }

  AddNewCorporateUser(data: AddUserService) {
    console.log(data);
    this.router.navigate(["user-management", "add-user"], {
      queryParams: { id : data.corporate_id, type: data.partner_type }
    });
  }
  viewBillsEvent(data: number){
    this.router.navigate(['franchisee-billing', 'view-payments'],{ queryParams: { id: data }});
  }
  viewvehicleEvent(data: number){
    this.router.navigate(['asset-inventory','assets-main'],{ queryParams: { id: data }})
  }
  viewRpEvent(data: number){
    this.router.navigate(['rental-point','rental-point-main'],{ queryParams: { id: data }})
  }
}
