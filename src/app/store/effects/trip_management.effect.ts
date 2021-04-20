import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { mergeMap, catchError, map, exhaustMap, take } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { TripManagementActionTypes, TripManagementListLoadAction, TripManagementListLoadSuccessAction, TripManagementListLoadFailureAction, EndTripAction, EndTripSuccessAction, EndTripFailureAction, rentalPointLoadAction, rentalPointLoadSuccessAction, rentalPointLoadFailureAction, TripDetailsAction, TripDetailsFailureAction, TripDetailsSuccessAction } from '../actions/trip_management.action';
import { TripManagementService } from 'src/app/service/trip-management/trip-management.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { RegionService } from 'src/app/service/region/region.service';

@Injectable()
export class TripManagementEffects {
    constructor(private actions$: Actions, private router: Router, private regionService: RegionService, private tripManagementService: TripManagementService, private store: Store<AppState>) { }

    tripManagementListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(TripManagementActionTypes.Trip_Management_List_Load),
            mergeMap((action: TripManagementListLoadAction) =>
            forkJoin([
                this.tripManagementService.getTrip(action.payload),
                this.regionService.getRegionList(),
                this.regionService.getCities(),
            ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors)) {
                            return new TripManagementListLoadFailureAction(response[0].Errors)
                        }
                        else{
                        return new TripManagementListLoadSuccessAction(response);
                    }
                    }),
                    catchError(error => of(new TripManagementListLoadFailureAction({
                        Info: [],
                        Business_Errors: [{
                            Code: "SE001"
                        }],
                        Warnings: [],
                        System_Errors: []
                    })))
                )
            )
        )
    );

    rentalPoint$ = createEffect(() => this.actions$
        .pipe(
            ofType(TripManagementActionTypes.Rental_Point_Load_Action),
            mergeMap((action: rentalPointLoadAction) =>
                this.tripManagementService.getRentalPoint(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new rentalPointLoadFailureAction(response.Errors)
                        }
                        else {
                            return new rentalPointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new rentalPointLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ],
                    })))
                )
            )
        )
    );


    tripDetailsLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(TripManagementActionTypes.Trip_Details_Load),
            mergeMap((action: TripDetailsAction) =>
                this.tripManagementService.getTripDetails(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TripDetailsFailureAction(response.Errors)
                        }
                        else {
                            return new TripDetailsSuccessAction(response)
                        }
                    }),
                    catchError(error => of(new TripDetailsFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                    })))
                )
            )
        )
    );

    endTripManagement$ = createEffect(() => this.actions$
        .pipe(
            ofType(TripManagementActionTypes.End_Trip_Action),
            exhaustMap((action: EndTripAction) =>
                this.tripManagementService.endTrip(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EndTripFailureAction(response.Errors)
                        }
                        else {
                            this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                                admn_user_id => {
                                    this.store.dispatch(new TripManagementListLoadAction(admn_user_id));
                                }
                            )
                            return new EndTripSuccessAction();
                        }
                    }),
                    catchError(error => of(new EndTripFailureAction({
                        Info: [],
                        Business_Errors: [{
                            Code: "SE001"
                        }],
                        Warnings: [],
                        System_Errors: []
                    })))
                )
            )
        )
    );

}