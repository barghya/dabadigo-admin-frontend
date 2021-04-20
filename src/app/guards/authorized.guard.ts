import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AppState } from '../models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/userModel';

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate {
    response: boolean;
    constructor(private store: Store<AppState>, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.store.select(state => state.user.permissions).pipe(take(1)).subscribe(
            permissions => {
                if (!!permissions) {
                    var sideNavItems = environment.sidenavItems;
                    var path = "/" + route.url[0].path;
                    var menuitem = sideNavItems[0].menuItems.find(m => m.menuLink == path)
                    if (!!menuitem) {
                        this.checkPermission(permissions, menuitem)                        
                    }
                    else {
                        menuitem = sideNavItems[1].menuItems.find(m => m.menuLink == path)
                        if (!!menuitem) {
                            this.checkPermission(permissions, menuitem)
                        }
                        else {
                            menuitem = sideNavItems[2].menuItems.find(m => m.menuLink == path)
                            if (!!menuitem) {
                                this.checkPermission(permissions, menuitem)
                            }
                            else {
                                this.response = false;
                            }
                        }
                    }
                }
                else {
                    this.response = false;
                }
            }
        )
        return this.response;
    }

    checkPermission(permissions: Permission[], menuitem: any) {
        var permissionItem = permissions.find(m => m.control_element_name == menuitem.control)
        if(!!permissionItem) {
            this.response = permissions.find(m => m.control_element_name == menuitem.control).permission_code != 0
        }
        else {
            this.response = false;
        }
    }
}

@Injectable({providedIn: 'root'})
export class AuthorizedLoadGuard implements CanLoad {
    response: boolean;
    constructor(private store: Store<AppState>, private router: Router){}
    canLoad(route: Route) {
        this.store.select(state => state.user.permissions).pipe(take(1)).subscribe(
            permissions => {
                if (!!permissions) {
                    var sideNavItems = environment.sidenavItems;
                    var path = "/" + route.path;
                    var menuitem = sideNavItems[0].menuItems.find(m => m.menuLink == path)
                    if (!!menuitem) {
                        this.checkPermission(permissions, menuitem)
                    }
                    else {
                        menuitem = sideNavItems[1].menuItems.find(m => m.menuLink == path)
                        if (!!menuitem) {
                            this.checkPermission(permissions, menuitem)
                        }
                        else {
                            menuitem = sideNavItems[2].menuItems.find(m => m.menuLink == path)
                            if (!!menuitem) {
                                this.checkPermission(permissions, menuitem)
                            }
                            else {
                                this.response = false;
                            }
                        }
                    }
                }
                else {
                    this.response = false;
                }
            }
        )
        return this.response;
    }

    checkPermission(permissions: Permission[], menuitem: any) {
        var permissionItem = permissions.find(m => m.control_element_name == menuitem.control)
        if(!!permissionItem) {
            this.response = permissions.find(m => m.control_element_name == menuitem.control).permission_code != 0
        }
        else {
            this.response = false;
        }
    }
}