import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin,} from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { FranchiseRentalPointLoadAction, FranchiseRentalPointLoadSuccessAction, FranchiseRentalPointLoadFailureAction, FranchiseManagementAction, GetFranchiseRentalPointHistoryAction, GetFranchiseRentalPointHistorySuccessAction, GetFranchiseRentalPointHistoryFailureAction } from '../actions/franchise_management.action';
import { FranchiseRentalPointService } from 'src/app/service/franchise-rental-point/franchise-rental-point.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Injectable() 
export class FranchiseEffects {
    constructor(private router: Router, private actions$: Actions,private FranchiserentalPointService: FranchiseRentalPointService, private rentalPointService: RentalPointService, ) { }

    FranchiseRentalPointList$ = createEffect(() => this.actions$
    .pipe(
        ofType(FranchiseManagementAction.Franchise_Rental_Point_Load),
        mergeMap((action: FranchiseRentalPointLoadAction) =>
            this.FranchiserentalPointService.GetFranchiseRentalPoints(action.payload).pipe(
                map((response) => {
                    console.log(response); 
                    
                        return new FranchiseRentalPointLoadSuccessAction(response);
                  
                }),
                catchError(error => of(new FranchiseRentalPointLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [{
                        Code: "SE001"
                    }]
                })))
            )
        )
    )
);


FranchiseRentalPointDetails$ = createEffect(() => this.actions$
    .pipe(
        ofType(FranchiseManagementAction.Get_Franchise_Rental_Point_History),
        mergeMap((action: GetFranchiseRentalPointHistoryAction) =>
        forkJoin([
            this.FranchiserentalPointService.getFranchiseRentalPointHistory(action.payload),
            this.rentalPointService.getAvailableBattery({vehicle_id: null})
        ]).pipe(
                map((response) => {
                    console.log(response); 
                    
                        return new GetFranchiseRentalPointHistorySuccessAction(response);
                  
                }),
                catchError(error => of(new GetFranchiseRentalPointHistoryFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [{
                        Code: "SE001"
                    }]
                })))
            )
        )
    )
);
}