import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AppState } from '../models/appStateModel';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticatedGuard implements CanActivate {
    admn_user_id: number;
    constructor(private store: Store<AppState>, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.store.select(state=> state.user).pipe(take(1)).subscribe(
            (user)=>{
               this.admn_user_id = user.userdetail.admn_user_id;
            }
        )
        if(this.admn_user_id > 0){
            return true;
        }else{
            this.router.navigate(['login'], { replaceUrl: true });
            return false;
        }
    }
}

@Injectable({providedIn: 'root'})
export class AuthenticatedLoadGuard implements CanLoad {
    admn_user_id: number;
    constructor(private store: Store<AppState>, private router: Router){}
    canLoad(route: Route) {
        this.store.select(state=> state.user).pipe(take(1)).subscribe(
            (user)=>{
               this.admn_user_id = user.userdetail.admn_user_id;
            }
        )
        if(this.admn_user_id > 0){
            console.log(this.admn_user_id);
            return true;
        }else{
            this.router.navigate(['login'], { replaceUrl: true });
            return false;
        }
    }
}