import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavItem } from 'src/app/models/sidenavModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  SidenavItems: SidenavItem[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.SidenavItems = JSON.parse(JSON.stringify(environment.sidenavItems));

    this.subs.add(this.store.select(state => state.user.permissions).subscribe(
      (permissions) => {
        if(!!permissions) {
          permissions.forEach(permission => {
            var menuitem = this.SidenavItems[0].menuItems.find(m => m.control == permission.control_element_name)
            if(!!menuitem) {
              menuitem.permission = permission.permission_code;
            }
            else {
              menuitem = this.SidenavItems[1].menuItems.find(m => m.control == permission.control_element_name)
              if(!!menuitem) {
                menuitem.permission = permission.permission_code;
              }
              else {
                menuitem = this.SidenavItems[2].menuItems.find(m => m.control == permission.control_element_name)
                if(!!menuitem) {
                  menuitem.permission = permission.permission_code;
                } 
              }
            }
          })
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
