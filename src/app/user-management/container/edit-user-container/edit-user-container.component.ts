import { Component, OnInit, OnDestroy } from '@angular/core';
import { users, role, region } from 'src/app/models/userManagement';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditUserLoadAction, EditUserAction } from 'src/app/store/actions/user_management.action';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-user-container',
  templateUrl: './edit-user-container.component.html',
  styleUrls: ['./edit-user-container.component.scss']
})
export class EditUserContainerComponent implements OnInit, OnDestroy {
  editDetails: Observable<users[]>
  User: users;
  singleUser$: Observable<users>;
  adminRole$: Observable<role[]>;
  region$: Observable<region[]>;
  userType$: Observable<DomainData[]>;
  userStatus$: Observable<DomainData[]>;
  corporate$: Observable<CorporateManagement[]>;
  availableRegions$: Observable<region[]>;
  countries$: Observable<countries[]>;
  statesName$: Observable<states[]>; 
  cities$: Observable<CityItem[]>;

  private subs = new SubSink();
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var user_id = +params['id'];
      this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
        admn_user_id => {
          this.store.dispatch(new EditUserLoadAction({
            admn_user_id: user_id,
            current_user: admn_user_id
          }))
        }
      )
    }));
    this.store.select(state => state.user.userdetail.user_type).pipe(take(1)).subscribe(
      user_type => {
        if(user_type != 1) {
          this.userType$ = this.store.select(state => state.user_management.user_type).pipe(map(
            user_types => user_types.filter(m => m.domain_code == user_type)
          ));
        }
        else {
          this.userType$ = this.store.select(state => state.user_management.user_type);
        }
      }
    )
    this.store.select(state => state.user.userdetail.user_type).pipe(take(1)).subscribe(
      user_type => {
        this.store.select(state => state.profile_management.singleProfile.corporate_id).pipe(take(1)).subscribe(
          admn_partner_id => {
            if (user_type != 1) {
              this.corporate$ = this.store.select(state => state.user_management.corporate).pipe(map(
                corporates => corporates.filter(m => m.admn_partner_id == admn_partner_id)
              ));
            }
            else {
              this.corporate$ = this.store.select(state => state.user_management.corporate);
            }
          }
        )
      }
    )
    this.adminRole$ = this.store.select(state => state.user_management.Role);
    this.availableRegions$ = this.store.select(state => state.user_management.Region);
    this.userStatus$ = this.store.select(state => state.user_management.user_status);
    this.singleUser$ = this.store.select(state => state.user_management.singleUser);
    // this.corporate$ = this.store.select(state => state.user_management.corporate);
    this.countries$ = this.store.select(state => state.user_management.countries);
    this.statesName$ = this.store.select(state => state.user_management.States);
    this.cities$ = this.store.select(state => state.user_management.cities);
  }

  AdminEditForm(value: users) {
    console.log('edit user', value);
    this.store.dispatch(new EditUserAction(value));
  }

  canceluser() {
    this.router.navigate(['user-management', 'admin-main'])
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
