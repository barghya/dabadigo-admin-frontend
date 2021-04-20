import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, catchError, map, exhaustMap } from 'rxjs/operators';
import { RentalPointLoadAction, RentalPointLoadSuccessAction, RentalPointLoadFailureAction, RentalPointAction, AddRentalPointAction, AddRentalPointSuccessAction, AddRentalPointFailureAction, DeleteRentalPointAction, EditRentalPointLoadAction, EditRentalPointLoadSuccessAction, EditRentalPointLoadFailureAction, EditRentalPointAction, EditRentalPointFailureAction, EditRentalPointSuccessAction, AddAnotherRentalPoint, GetRentalPointHistoryAction, GetRentalPointHistoryFailureAction, GetRentalPointHistorySuccessAction, MoveRentalPointAction, MoveRentalPointFailureAction, MoveRentalPointSuccessAction, AddRentalPointLoadAction, AddRentalPointLoadSuccessAction, AddRentalPointLoadFailureAction, AddBatteryRPAction, AddBatteryRPFailureAction, AddBatteryRPSuccessAction, RemoveBatteryRPAction, RemoveBatteryRPFailureAction, RemoveBatteryRPSuccessAction, } from '../actions/rental_point.action';
import { of, forkJoin, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { Router } from '@angular/router';
// import { MapmyindiaService } from 'src/app/service/mapmyIndiaService/mapmyindia.service';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionService } from 'src/app/service/region/region.service';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';

@Injectable()
export class RentalPointEffects {
    constructor(private store: Store<AppState>,private actions$: Actions, private rentalPointService: RentalPointService, private fsqHubService: FsqHubService, private router: Router, private regionService: RegionService) { }

    RentalPointList$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Rental_Point_Load),
            mergeMap((action: RentalPointLoadAction) =>
            forkJoin([
                this.rentalPointService.GetRentalPoints(),
                this.rentalPointService.getOwnershipCode(),
                this.rentalPointService.GetavailableFranchise(),
            ]).pipe(
                    map((response) => {
                        console.log(response); 
                        if(!!(<ErrorModel>response[1].Errors)) {
                            if(response[1].Errors){
                                return new RentalPointLoadFailureAction(response[1].Errors)
                            }
                        }
                        else {
                            return new RentalPointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new RentalPointLoadFailureAction({
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

    RentalPointAdd$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Add_Rental_Point),
            exhaustMap((action: AddRentalPointAction) =>
                this.rentalPointService.addRentalpoint(action.payload).pipe(
                    map((response => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new AddRentalPointFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['rental-point', 'rental-point-main']);
                            return new AddRentalPointSuccessAction();
                        }
                    })),
                    catchError(error => of(new AddRentalPointFailureAction({
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

    RentalPointDelete$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Delete_Rental_Point),
            exhaustMap((action: DeleteRentalPointAction) =>
                this.rentalPointService.deleteRentalPoint(action.payload).pipe(
                    map((response => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new AddRentalPointFailureAction(response.Errors);
                        }
                        else {
                            return new RentalPointLoadAction();
                        }
                    })),
                    catchError(error => of(new AddRentalPointFailureAction({
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

    RentalPointAddLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Add_Rental_Point_Load),
            mergeMap((action: AddRentalPointLoadAction) =>
                forkJoin([
                    this.rentalPointService.getRentalpointType(),
                    this.rentalPointService.getOwnershipCode(),
                    this.rentalPointService.getRentalPointStatus(),
                    this.rentalPointService.GetCountries(),
                    this.regionService.getRegionList(),
                    this.fsqHubService.GetavailableManagers(),
                    this.regionService.GetStates(),
                    this.regionService.getCities(),
                    this.rentalPointService.GetavailableFranchise(),
                ]).pipe(
                    map((response => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors)){
                            if(response[0].Errors){
                                return new AddRentalPointLoadFailureAction(response[0].Errors)
                            }
                            else if(response[1].Errors){
                                return new AddRentalPointLoadFailureAction(response[1].Errors)
                            }
                            else if(response[2].Errors){
                                return new AddRentalPointLoadFailureAction(response[2].Errors)
                            }
                        }
                        else{
                            return new AddRentalPointLoadSuccessAction(response);
                        }
                    })),
                    catchError(error => of(new AddRentalPointLoadFailureAction({
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
    )


    RentalPointEditLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Edit_Rental_Point_Load),
            mergeMap((action: EditRentalPointLoadAction) =>
                forkJoin([
                    this.rentalPointService.getRentalpointType(),
                    this.rentalPointService.getOwnershipCode(),
                    this.rentalPointService.getRentalPointStatus(),
                    this.rentalPointService.getSingleRentalpoint(action.payload),
                    this.rentalPointService.GetCountries(),
                    this.regionService.getRegionList(),
                    this.fsqHubService.GetavailableManagers(),
                    this.regionService.GetStates(),
                    this.regionService.getCities(),
                    this.rentalPointService.GetavailableFranchise(),
                ]).pipe(
                    map((response => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors || <ErrorModel>response[3].Errors)){
                            if(response[0].Errors){
                                return new EditRentalPointLoadFailureAction(response[0].Errors)
                            }
                            if(response[1].Errors){
                                return new EditRentalPointLoadFailureAction(response[1].Errors)
                            }
                            if(response[2].Errors){
                                return new EditRentalPointLoadFailureAction(response[2].Errors)
                            }
                            if(response[3].Errors){
                                return new EditRentalPointLoadFailureAction(response[3].Errors)
                            }
                        }
                        else{
                            return new EditRentalPointLoadSuccessAction(response);
                        }
                    })),
                    catchError(error => of(new EditRentalPointLoadFailureAction({
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

    RentalPointEdit$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Edit_Rental_Point),
            exhaustMap((action: EditRentalPointAction) =>
                this.rentalPointService.editRentalPoint(action.payload).pipe(
                    map((response => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new EditRentalPointFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['rental-point', 'rental-point-main']);
                            return new EditRentalPointSuccessAction();
                        }
                    })),
                    catchError(error => of(new EditRentalPointFailureAction({
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

    RentalPointAddAnother$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Add_Another_Rental_Point),
            exhaustMap((action: AddAnotherRentalPoint) =>
                this.rentalPointService.addRentalpoint(action.payload).pipe(
                    map((response => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new AddRentalPointFailureAction(response.Errors);
                        }
                        else {
                            return new AddRentalPointSuccessAction();
                        }
                    })),
                    catchError(error => of(new AddRentalPointFailureAction({
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
    RentalPointHistory$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Get_Rental_Point_History),
            mergeMap((action: GetRentalPointHistoryAction) =>
            forkJoin([this.rentalPointService.getRentalPointHistory(action.payload),
                    this.rentalPointService.getAvailableBattery({vehicle_id: null})])
                .pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response[0].Errors) {
                            return new GetRentalPointHistoryFailureAction(response[0].Errors);
                        }else if(!!<ErrorModel>response[1].Errors){
                            return new GetRentalPointHistoryFailureAction(response[1].Errors);
                        }
                        else {
                            return new GetRentalPointHistorySuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetRentalPointHistoryFailureAction({
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

    RentalPointMove$ = createEffect(() => this.actions$
        .pipe(
            ofType(RentalPointAction.Move_Rental_Point),
            exhaustMap((action: MoveRentalPointAction) =>
                this.rentalPointService.moveRentalPoint(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new MoveRentalPointFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['rental-point', 'rental-point-main']);
                            return new MoveRentalPointSuccessAction();
                        }
                    }),
                    catchError(error => of(new MoveRentalPointFailureAction({
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

    AddBatteryRp$ = createEffect(() => this.actions$
    .pipe(
        ofType(RentalPointAction.Add_Battery_RP_Action),
        exhaustMap((action: AddBatteryRPAction) =>
            this.rentalPointService.AddBatteryRp(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if (!!<ErrorModel>response.Errors) {
                        return new AddBatteryRPFailureAction(response.Errors);
                    }
                    else {
                        this.store.dispatch(new GetRentalPointHistoryAction({rentalpoint_id: action.payload.rentalpoint_id}))
                        return new AddBatteryRPSuccessAction();
                    }
                }),
                catchError(error => of(new AddBatteryRPFailureAction({
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

RemoveBatteryRp$ = createEffect(() => this.actions$
.pipe(
    ofType(RentalPointAction.Remove_Battery_RP_Action),
    exhaustMap((action: RemoveBatteryRPAction) =>
        this.rentalPointService.removeBattery({stock_id: action.payload.stock_id}).pipe(
            map((response) => {
                console.log(response);
                if (!!<ErrorModel>response.Errors) {
                    return new RemoveBatteryRPFailureAction(response.Errors);
                }
                else {
                    this.store.dispatch(new GetRentalPointHistoryAction({rentalpoint_id: action.payload.rentalpoint_id}))
                    return new RemoveBatteryRPSuccessAction();
                }
            }),
            catchError(error => of(new RemoveBatteryRPFailureAction({
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