import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegionService } from 'src/app/service/region/region.service';
import { DashboardActionTypes, DashboardLoadAction, DashboardLoadFailureAction, DashboardLoadSuccessAction } from '../actions/dashboard.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';
import { forkJoin, of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';

@Injectable()
export class DashboardEffects {
    constructor(private router: Router, private actions$: Actions, private regionService: RegionService, private userManagementService: UserManagementService) { }

    dashboardLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActionTypes.Dashboard_Load),
            mergeMap((action: DashboardLoadAction) =>
                forkJoin([
                    this.regionService.getRegionList(),
                    this.userManagementService.GetUserByID({ admn_user_id: action.payload }),
                    this.regionService.getCities(),
                    this.regionService.GetStates()
                ]).pipe(
                    map(response => {
                        if (<ErrorModel>response[1].Errors) {
                            return new DashboardLoadFailureAction(response[1].Errors);
                        }
                        else {
                            return new DashboardLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new DashboardLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    }))))
            ),
        )
    );
}