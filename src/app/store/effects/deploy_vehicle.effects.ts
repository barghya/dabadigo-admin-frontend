import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeployVehicleActionTypes, AddDeployvehicleLoadFailure, AddDeployvehicleLoadSuccess, AddDeployVehicleLoad, VehicleRequestListLoadAction, VehicleRequestListLoadSuccessAction, VehicleRequestListLoadFailureAction, VehicleDeployListLoadAction, VehicleDeployListLoadSuccessAction, VehicleDeployListLoadFailureAction, AddRequestVehicleAction, AddRequestVehicleFailureAction, AddRequestVehicleSuccessAction, DeployVehicleLoadAction, DeployVehicleLoadSuccessAction, DeployVehicleLoadFailureAction, DeployvehicleAction, DeployvehicleSuccessAction, DeployvehicleFailureAction, DeleteDeployVehicleAction, DeleteDeployVehicleFailureAction } from '../actions/deploy_vehicle.action';
import { RegionService } from 'src/app/service/region/region.service';
import { of, forkJoin } from 'rxjs';
import { map, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';
import { DeployVehicleService } from 'src/app/service/deploy-vehicle/deploy-vehicle.service';
import { ErrorModel } from 'src/app/models/errorModel';
import { Router } from '@angular/router';

@Injectable()
export class DeployVehicleEffects {
    constructor(private router: Router, private actions$: Actions, private regionService: RegionService, private rentalPointService: RentalPointService, private userManagementService: UserManagementService, private deployVehicleService: DeployVehicleService) { }
    addDeployVehicleLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Add_Deploy_vehicle_load),
            mergeMap((action: AddDeployVehicleLoad) =>
                forkJoin([
                    this.regionService.getRegionList(),
                    this.rentalPointService.GetRentalPoints(),
                    this.userManagementService.GetUserList(action.payload)
                ]).pipe(
                    map((response => {
                        console.log(response);
                        return new AddDeployvehicleLoadSuccess(response);
                    })),
                    catchError(error => of(new AddDeployvehicleLoadFailure({
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

    vehicleRequestListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Vehicle_Request_List_Load),
            mergeMap((action: VehicleRequestListLoadAction) =>
            forkJoin([
                this.deployVehicleService.GetVehicleByRequestList(),
                this.regionService.getRegionList(),
                this.regionService.getCities(),
                this.regionService.GetStates(),
            ]).pipe(
                    map((response) => {
                        console.log(response);
                        return new VehicleRequestListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new VehicleRequestListLoadFailureAction({
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

    vehicleDeployListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Vehicle_Deploy_List_Load),
            mergeMap((action: VehicleDeployListLoadAction) =>
                this.deployVehicleService.GetDeployVehicleList().pipe(
                    map((response) => {
                        console.log(response);
                        return new VehicleDeployListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new VehicleDeployListLoadFailureAction({
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

    addRequestVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Create_Request_Vehicle),
            exhaustMap((action: AddRequestVehicleAction) =>
                this.deployVehicleService.addRequsetVehicle(action.payload).pipe(
                    map((response => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new AddRequestVehicleFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['deploy-vehicle', 'deploy-vehicle-main']);
                            return new AddRequestVehicleSuccessAction();
                        }
                    })),
                    catchError(error => of(new AddRequestVehicleFailureAction({
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

    deployVehicleLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Deploy_Vehicle_Load_Action),
            mergeMap((action: DeployVehicleLoadAction) =>
                this.deployVehicleService.deployVehicleByID(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeployVehicleLoadFailureAction(response.Errors)
                        }
                        else {
                            return new DeployVehicleLoadSuccessAction(response)
                        }
                    }),
                    catchError(error => of(new DeployVehicleLoadFailureAction({
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

    deployVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(DeployVehicleActionTypes.Deploy_Vehicle_Action),
            exhaustMap((action: DeployvehicleAction) =>
           
                this.deployVehicleService.UpdateDeployVehicle(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeployvehicleFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['deploy-vehicle', 'deploy-vehicle-main']);
                            return new DeployvehicleSuccessAction()
                        }
                    }),
                    catchError(error => of(new DeployvehicleFailureAction({
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

    DeleteDeployVehicle$ = createEffect(() => this.actions$
    .pipe(
        ofType(DeployVehicleActionTypes.Delete_Deploy_Vehicle_Action),
        exhaustMap((action: DeleteDeployVehicleAction) =>
            this.deployVehicleService.DeleteDepoyVehicle(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if (!!(<ErrorModel>response.Errors)) {
                        return new DeleteDeployVehicleFailureAction(response.Errors)
                    }
                    else {
                        return new VehicleRequestListLoadAction();
                    }
                }),
                catchError(error => of(new DeleteDeployVehicleFailureAction({
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


}