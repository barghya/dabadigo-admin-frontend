import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { MaintenanceJobsService } from 'src/app/service/maintenance-jobs/maintenance-jobs.service';
import { MaintenanceJobsActionTypes, MaintenanceJobsLoadAction, MaintenanceJobsLoadFailureAction, MaintenanceJobsLoadSuccessAction, MaintenanceJobsFilterAction, MaintenanceJobsFilterFailureAction, MaintenanceJobsFilterSuccessAction, MaintenanceJobDetailLoadAction, MaintenanceJobDetailLoadFailureAction, MaintenanceJobDetailLoadSuccessAction, MaintenanceJobResolveAction, MaintenanceJobResolveFailureAction, MaintenanceJobResolveSuccessAction, MaintenanceJobCreateAction, MaintenanceJobCreateFailureAction, MaintenanceJobCreateSuccessAction, MaintenanceJobAssignFailureAction, MaintenanceJobAssignSuccessAction, MaintenanceJobAssignAction, MaintenanceJobCreateLoadAction, MaintenanceJobCreateLoadSuccessAction, MaintenanceJobCreateLoadFailureAction, MaintenanceJobAssignLoadAction, MaintenanceJobAssignLoadSuccessAction, MaintenanceJobAssignLoadFailureAction, MaintenanceScheduleLoadAction, MaintenanceScheduleLoadFailureAction, MaintenanceScheduleLoadSuccessAction, MaintenanceScheduleUpdateLoadAction, MaintenanceScheduleUpdateLoadFailureAction, MaintenanceScheduleUpdateLoadSuccessAction, MaintenanceScheduleUpdateFailureAction, MaintenanceScheduleUpdateAction, MaintenanceScheduleUpdateSuccessAction, MaintenanceRentalpointLoadAction, MaintenanceRentalpointLoadFailureAction, MaintenanceRentalpointLoadSuccessAction, MaintenanceFsqLoadAction, MaintenanceFsqLoadSuccessAction, MaintenanceFsqLoadFailureAction } from '../actions/maintenance_jobs.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ErrorModel } from 'src/app/models/errorModel';
import { of, forkJoin } from 'rxjs';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { RegionService } from 'src/app/service/region/region.service';
import { FsqManagementService } from 'src/app/service/fsq-management/fsq-management.service';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { MatSnackBar } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';

@Injectable()
export class MaintenanceJobsEffects {

    constructor(private actions$: Actions, 
        private store: Store<AppState>, 
        private router: Router,
        private maintenanceJobsService: MaintenanceJobsService,
        private rentalPointService: RentalPointService,
        private regionService: RegionService,
        private fsqManagementService: FsqManagementService,
        private assetInventoryService: AssetInventoryService,
        private domainService: DomainService,
        private _snackBar: MatSnackBar,
        private languageService: LanguageService,
        private userManagementService: UserManagementService) { }

    maintenanceJobsLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Jobs_Load),
            mergeMap((action: MaintenanceJobsLoadAction) =>
                forkJoin([
                    this.maintenanceJobsService.getMaintenanceJobsFiltered(action.payload),
                    this.rentalPointService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getRegionList(),
                    this.assetInventoryService.GetAssetList(),
                    this.domainService.GetProblemStatus(),
                    this.domainService.GetFsqSkillLevels(),
                    this.regionService.getCities(),
                    this.userManagementService.getActiveBeuUsers()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response[0].Errors) {
                            return new MaintenanceJobsLoadFailureAction(response[0].Errors);
                        }
                        else {
                            return new MaintenanceJobsLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceJobsLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceRentalpointLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Rentalpoint_Load),
            mergeMap((action: MaintenanceRentalpointLoadAction) =>
                this.rentalPointService.getRentalpointsByRegion(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new MaintenanceRentalpointLoadFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceRentalpointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceRentalpointLoadFailureAction({
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

    maintenanceFsqLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Fsq_Load),
            mergeMap((action: MaintenanceFsqLoadAction) =>
                this.fsqManagementService.SearchActiveFsq(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new MaintenanceFsqLoadFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceFsqLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceFsqLoadFailureAction({
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

    maintenanceJobsFilter$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Jobs_Filter),
            mergeMap((action: MaintenanceJobsFilterAction) =>                
                this.maintenanceJobsService.getMaintenanceJobsFiltered(action.payload).pipe(
                    map((response) => {
                        if(<ErrorModel>response.Errors) {
                            return new MaintenanceJobsFilterFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceJobsFilterSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceJobsFilterFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobDetailLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Detail_Load),
            mergeMap((action: MaintenanceJobDetailLoadAction) =>
                this.maintenanceJobsService.getMaintenanceJobDetailById(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceJobDetailLoadFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceJobDetailLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceJobDetailLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobResolve$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Resolve),
            mergeMap((action: MaintenanceJobResolveAction) =>
                this.maintenanceJobsService.resolveMaintenanceJob(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceJobResolveFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["maintenance-jobs", "maintenance-jobs-main"]);
                            return new MaintenanceJobResolveSuccessAction();
                        }
                    }),
                    catchError(error => of(new MaintenanceJobResolveFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobCreateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Create_Load),
            mergeMap((action: MaintenanceJobCreateLoadAction) =>
                this.assetInventoryService.GetAssetList().pipe(
                    map((response) => {
                        return new MaintenanceJobCreateLoadSuccessAction(response);
                    }),
                    catchError(error => of(new MaintenanceJobCreateLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobCreate$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Create),
            mergeMap((action: MaintenanceJobCreateAction) =>
                this.maintenanceJobsService.createMaintenanceJob(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceJobCreateFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["maintenance-jobs", "maintenance-jobs-main"]);
                            return new MaintenanceJobCreateSuccessAction();
                        }
                    }),
                    catchError(error => of(new MaintenanceJobCreateFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobAssignLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Assign_Load),
            mergeMap((action: MaintenanceJobAssignLoadAction) =>
                this.fsqManagementService.getFSQManagement().pipe(
                    map((response) => {
                        return new MaintenanceJobAssignLoadSuccessAction(response);
                    }),
                    catchError(error => of(new MaintenanceJobAssignLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceJobAssign$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Job_Assign),
            mergeMap((action: MaintenanceJobAssignAction) =>
                this.maintenanceJobsService.assignMaintenanceJob(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceJobAssignFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["maintenance-jobs", "maintenance-jobs-main"]);
                            return new MaintenanceJobAssignSuccessAction();
                        }
                    }),
                    catchError(error => of(new MaintenanceJobAssignFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceScheduleLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Schedule_Load),
            mergeMap((action: MaintenanceScheduleLoadAction) =>
                this.domainService.GetVehicleTypes().pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceScheduleLoadFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceScheduleLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceScheduleLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );

    maintenanceScheduleUpdateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Schedule_Update_Load),
            mergeMap((action: MaintenanceScheduleUpdateLoadAction) =>
                this.maintenanceJobsService.getScheduleByVehicleType(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceScheduleUpdateLoadFailureAction(response.Errors);
                        }
                        else {
                            return new MaintenanceScheduleUpdateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new MaintenanceScheduleUpdateLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );


    maintenanceScheduleUpdate$ = createEffect(() => this.actions$
        .pipe(
            ofType(MaintenanceJobsActionTypes.Maintenance_Schedule_Update),
            mergeMap((action: MaintenanceScheduleUpdateAction) =>
                this.maintenanceJobsService.updateMaintenanceSchedule(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new MaintenanceScheduleUpdateFailureAction(response.Errors);
                        }
                        else {
                            var message = this.languageService.getText('scheduleUpdatedSuccessfullyText');
                            const snackbar = this._snackBar.open(message, "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            return new MaintenanceScheduleUpdateSuccessAction();
                        }
                    }),
                    catchError(error => of(new MaintenanceScheduleUpdateFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE001"
                            }
                        ]
                    })))
                )
            )
        )
    );
}