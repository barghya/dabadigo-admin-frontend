import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { FranchiseVehicleLoadAction, FranchiseVehicleLoadSuccessAction, FranchiseVehicleLoadFailureAction, FranchiseVehicleAction } from '../actions/franchise_vehicle.action';
import { FranchiseVehicleService } from 'src/app/service/franchise-vehicle/franchise-vehicle.service';

@Injectable() 
export class FranchiseVehicleEffects {
    constructor(private router: Router, private actions$: Actions,private FranchisevehicleService: FranchiseVehicleService,) { }

    FranchiseVehicleList$ = createEffect(() => this.actions$
    .pipe(
        ofType(FranchiseVehicleAction.Franchise_Vehicle_Load),
        mergeMap((action: FranchiseVehicleLoadAction) =>
            this.FranchisevehicleService.GetFranchiseVehicle(action.payload).pipe(
                map((response) => {
                    console.log(response); 
                    
                        return new FranchiseVehicleLoadSuccessAction(response);
                  
                }),
                catchError(error => of(new FranchiseVehicleLoadFailureAction({
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