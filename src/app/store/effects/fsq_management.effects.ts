import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, exhaust, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { FSQManagementActionTypes, FSQManagementListLoadAction, ApproveRequestAction, FSQManagementListLoadSuccessAction, FSQManagementListLoadFailureAction, FSQRegionLoad, FSQRegionLoadSuccess, FSQRegionLoadFailure, UpdateRegionAction, UpdateRegionSuccessAction, UpdateRegionFailureAction, WorkItemListLoadAction, WorkItemListLoadSuccessAction, WorkItemListLoadFailureAction, WorkItemAssignLoadAction, WorkItemAssignLoadFailureAction, WorkItemAssignLoadSuccessAction, WorkItemAssignAction, WorkItemAssignSuccessAction, WorkItemAssignFailureAction, VerifyDocumentAction, VerifyDocumentSuccessAction, VerifyDocumentFailureAction, ApproveRequestSuccessAction, GetAllRegionAction, GetAllRegionSuccessAction, GetAllRegionFailureAction, AddFsqShiftAction, AddFsqShiftSuccessAction, AddFsqShiftFailureAction, GetAllShiftAction, GetAllShiftSuccessAction, GetAllShiftFaliureAction, DeleteFSQShiftAction, DeleteFSQShiftFailureAction, EditShiftLoadAction, EditShiftLoadFailureAction, EditShiftLoadSuccessAction, EditShiftAction, EditShiftFailureAction, EditShiftSuccessAction, GetIncidentDetailAction, GetIncidentDetailFailureAction, GetIncidentDetailSuccessAction, GetFSQTagedRegionAction, GetFSQTagedRegionfailureAction, GetFSQTagedRegionSuccessAction, FsqActiveInactiveAction, FsqActiveInactiveFailureAction, FsqActiveInactiveSuccessAction, GetFsqShiftRegionRentalPointAction, GetFsqShiftRegionRentalPointFailureAction, GetFsqShiftRegionRentalPointSuccessAction, GetAllVehicleLoadSuccessAction, GetAllVehicleLoadFailureAction, GetAllVehicleLoadAction, BookvehicleAction, BookvehicleSuccessAction, BookvehicleFailureAction, GetAssignvehicleFailureAction, GetAssignvehicleSuccessAction, GetAssignvehicleAction, FsqStartShiftAction, FsqStartShiftFailureAction, FsqEndShiftAction, FsqEndShiftFailureAction, UpdateFsqAction, UpdateFsqFailureAction, UpdateFsqSuccessAction, StartJobFailureAction, StartJobAction, StartJobSuccessAction, FSQReturnVehicleSuccessAction, FSQReturnVehicleFailureAction, FSQReturnVehicleAction, GetReturnRegionAction, GetReturnRegionFailureAction, GetReturnRegionSuccessAction, GetReturnRPAction, GetReturnRPSuccessAction, GetReturnRPFailureAction, FsqSearchLoadAction, FsqSearchLoadSuccessAction, FsqSearchLoadFailureAction, FsqPauseShiftAction, FsqPauseShiftFailureAction, FsqResumeShiftAction, FsqResumeShiftFailureAction, FsqRentalpointLoadAction, FsqRentalpointLoadSuccessAction, FsqRentalpointLoadFailureAction, GetFsqRegionByCityAction, GetFsqRegionByCityFailureAction, GetFsqRegionByCitySuccessAction, GetAllRentalPointLoadAction, GetAllRentalPointLoadSuccessAction, GetAllRentalPointLoadFailureAction, TaskdetailsListAction, TaskdetailsListSuccessAction, TaskdetailsListFailureAction } from '../actions/fsq_management.action';
import { FsqManagementService } from 'src/app/service/fsq-management/fsq-management.service';
import { ApproveRequestFailureAction } from '../actions/corporate_request_management.action';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionService } from 'src/app/service/region/region.service';
import { Router } from '@angular/router';
import { WorkItemAssignmentRequest } from 'src/app/models/fsqManagement';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatSnackBar } from '@angular/material';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Injectable()
export class FSQManagementEffects {
    constructor(private actions$: Actions,private rentalPointService: RentalPointService, private fsqManagementService: FsqManagementService, private regionService: RegionService, private router: Router,
        private store: Store<AppState>, private _snackBar: MatSnackBar, private domain_service: DomainService) { }

    fsqListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.FSQ_Management_List_Load),
            mergeMap((action: FSQManagementListLoadAction) =>
                this.fsqManagementService.getFSQ(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        return new FSQManagementListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new FSQManagementListLoadFailureAction({
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

    approveRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Approve_Request),
            mergeMap((action: ApproveRequestAction) =>
                this.fsqManagementService.approveRequest(action.payload).pipe(
                    map((response) => {
                        if (!!<ErrorModel>response.Errors) {
                            return new ApproveRequestFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['fsq-request-management', 'fsq-request-management']);
                            return new ApproveRequestSuccessAction();
                        }
                    }),
                    catchError(error => of(new ApproveRequestFailureAction({
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

    fsqRegionLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.FSQ_Region_Load),
            mergeMap((action: FSQRegionLoad) =>
                forkJoin([
                    this.regionService.getRegionList(),
                    this.fsqManagementService.RegionByID(action.payload),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[1].Errors)) {
                            return new FSQRegionLoadFailure(response[1].Errors)
                        }
                        else {
                            return new FSQRegionLoadSuccess(response)
                        }
                    }),
                    catchError(error => of(new FSQRegionLoadFailure({
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

    updateRegion$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.FSQ_Region_Update_Action),
            mergeMap((action: UpdateRegionAction) =>
                this.fsqManagementService.UpdateRegion(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new UpdateRegionFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['fsq-request-management', 'fsq-request-management']);
                            return new UpdateRegionSuccessAction();
                        }
                    }),
                    catchError(error => of(new UpdateRegionFailureAction({
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

    workItemList$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Work_Item_List_Load),
            mergeMap((action: WorkItemListLoadAction) =>
                this.fsqManagementService.getWorkItemList().pipe(
                    map((response) => {
                        console.log(response);
                        return new WorkItemListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new WorkItemListLoadFailureAction({
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
    //Work item assign load
    workItemAssignLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Work_Item_Assign_Load),
            mergeMap((action: WorkItemAssignLoadAction) =>
                forkJoin([
                    this.fsqManagementService.getActiveFsqList(action.payload),
                    this.fsqManagementService.getSingleWorkItem(action.payload)
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[1].Errors)) {
                            return new WorkItemAssignLoadFailureAction(response[1].Errors)
                        }
                        else {
                            console.log(response);
                            return new WorkItemAssignLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new WorkItemAssignLoadFailureAction({
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
    ///Work item assign submit action
    workItemAssign$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Work_Item_Assign),
            mergeMap((action: WorkItemAssignAction) =>
                this.fsqManagementService.submitRequest(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new WorkItemAssignFailureAction(response.Errors)
                        }
                        else {
                            this.store.dispatch(new WorkItemListLoadAction());
                            return new WorkItemAssignSuccessAction();
                        }
                    }),
                    catchError(error => of(new WorkItemAssignFailureAction({
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

    verifyDocument$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Verify_Document_Action),
            mergeMap((action: VerifyDocumentAction) =>
                forkJoin([this.fsqManagementService.documentVerification(action.payload),
                this.domain_service.GetAllFsqLevel(),
                this.fsqManagementService.GetFsqAllHub()])
                    .pipe(
                        map((response) => {
                            console.log(response);
                            return new VerifyDocumentSuccessAction(response);
                        }),
                        catchError(error => of(new VerifyDocumentFailureAction({
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

    GetAllRegion$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_All_region_Action),
            mergeMap((action: GetAllRegionAction) =>
                this.regionService.getRegionList().pipe(
                    map((response) => {
                        return new GetAllRegionSuccessAction(response)
                    }),
                    catchError(error => of(new GetAllRegionFailureAction({
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

    AddFsqShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Add_Fsq_Shift_Action),
            mergeMap((action: AddFsqShiftAction) =>
            this.fsqManagementService.CreateShift(action.payload).pipe(
                map((response) => {
                    console.log(response);

                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddFsqShiftFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Successfully Updated", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.store.dispatch(new GetAllShiftAction());
                            return new AddFsqShiftSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddFsqShiftFailureAction({
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

    GetAllShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_All_Shift_Action),
            mergeMap((action: GetAllShiftAction) =>
            forkJoin([
                this.fsqManagementService.GetAllShift(),
                this.fsqManagementService.GetBreakPoint(),
            ]).pipe(
                        map((response) => {
                            console.log(response);
                            if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors )) {
                                return new GetAllShiftFaliureAction(response[0].Errors);
                            }
                            else if (response[1].Errors) {
                                return new GetAllShiftFaliureAction(response[1].Errors)
                            }
                            else{
                                return new GetAllShiftSuccessAction(response)
                            }
                            
                        }),
                        catchError(error => of(new GetAllShiftFaliureAction({
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

    editShiftById = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Edit_Shift_Load),
            mergeMap((action: EditShiftLoadAction) =>
                forkJoin([
                    this.regionService.getRegionList(),
                    this.fsqManagementService.getFSQManagement(),
                    this.fsqManagementService.GetShiftByID(action.payload),
                ]).pipe(
                    map((response => {
                        if (!!(<ErrorModel>response[2].Errors)) {
                            return new EditShiftLoadFailureAction(response[2].Errors);
                        }
                        else {
                            return new EditShiftLoadSuccessAction(response)
                        }
                    })),
                    catchError(error => of(new EditShiftLoadFailureAction({
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
    )

    deleteFSQManagementShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Delete_FSQ_Shift),
            mergeMap((action: DeleteFSQShiftAction) =>
                this.fsqManagementService.DeleteFSQShift(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeleteFSQShiftFailureAction(response.Errors);
                        }
                        else {
                            const snackbar = this._snackBar.open("Successfully Deleted", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new GetAllShiftAction();
                        }
                    }),
                    catchError(error => of(new DeleteFSQShiftFailureAction({
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

    editShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Edit_Shift_Action),
            mergeMap((action: EditShiftAction) =>
                this.fsqManagementService.EditShift(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditShiftFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['fsq-request-management', 'shift-management'], { replaceUrl: true });
                            const snackbar = this._snackBar.open("Successfully Updated", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new EditShiftSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditShiftFailureAction({
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
    //get incident Detail

    getAllIncident$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_Incident_Detail_Action),
            exhaustMap((action: GetIncidentDetailAction) =>
                this.fsqManagementService.GetIncidentDetail(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetIncidentDetailFailureAction(response.Errors)
                        }
                        else {
                            return new GetIncidentDetailSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetIncidentDetailFailureAction({
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
    //gET fSQ Taged Region
    GetFsqTagedRegion$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_FSQ_Taged_Region_Action),
            exhaustMap((action: GetFSQTagedRegionAction) =>
                this.fsqManagementService.GetFsqTegedRegion(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetFSQTagedRegionfailureAction(response.Errors)
                        }
                        else {
                            return new GetFSQTagedRegionSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetFSQTagedRegionfailureAction({
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
    //gET fSQ Taged Region
    FsqActiveInactive$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Active_Inactive_Action),
            exhaustMap((action: FsqActiveInactiveAction) =>
                this.fsqManagementService.FsqActiveInactive(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqActiveInactiveFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Successfully Updated", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            this.store.dispatch(new FsqActiveInactiveSuccessAction())
                            return new FSQManagementListLoadAction(action.payload.fsq_id);
                        }
                    }),
                    catchError(error => of(new FsqActiveInactiveFailureAction({
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
    //get rental point by shift region
    RentalPontbyShuiftRegion$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_Fsq_Shift_Region_Rental_Point_Action),
            exhaustMap((action: GetFsqShiftRegionRentalPointAction) =>
                this.fsqManagementService.FsqShiftRegionRentalPoint(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetFsqShiftRegionRentalPointFailureAction(response.Errors)
                        }
                        else {
                            return new GetFsqShiftRegionRentalPointSuccessAction(response.rental_points);
                        }
                    }),
                    catchError(error => of(new GetFsqShiftRegionRentalPointFailureAction({
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
    //get All vehicle
    GetAllVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_All_Vehicle_Load_Action),
            exhaustMap((action: GetAllVehicleLoadAction) =>
                this.fsqManagementService.GetVehicleBYREntalPoint(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetAllVehicleLoadFailureAction(response.Errors)
                        }
                        else {
                            return new GetAllVehicleLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetAllVehicleLoadFailureAction({
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
     //get All rentalpoint
     GetAllRentalPoint$ = createEffect(() => this.actions$
     .pipe(
         ofType(FSQManagementActionTypes.Get_All_RentalPoint_Load_Action),
         exhaustMap((action: GetAllRentalPointLoadAction) =>
             this.fsqManagementService.getRentalpointsByRegion(action.payload).pipe(
                 map((response) => {
                     console.log(response);
                     if (!!(<ErrorModel>response.Errors)) {
                         return new GetAllRentalPointLoadFailureAction(response.Errors)
                     }
                     else {
                         return new GetAllRentalPointLoadSuccessAction(response);
                     }
                 }),
                 catchError(error => of(new GetAllRentalPointLoadFailureAction({
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
    //book vehicle
    BookVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Book_vehicle_Action),
            exhaustMap((action: BookvehicleAction) =>
                this.fsqManagementService.BookVehicleFsq(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new BookvehicleFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['fsq-request-management','shift-management']);
                            const snackbar = this._snackBar.open("Successfully Updated", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new BookvehicleSuccessAction();
                        }
                    }),
                    catchError(error => of(new BookvehicleFailureAction({
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
    //Get Assign Vehicle
    GetAssignVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_Assign_vehicle_Action),
            exhaustMap((action: GetAssignvehicleAction) =>
                this.fsqManagementService.getAssignVehicle(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetAssignvehicleFailureAction(response.Errors)
                        }
                        else {
                            return new GetAssignvehicleSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetAssignvehicleFailureAction({
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
    // fsq Start Shift
    FsqStartShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Start_Shift_Action),
            exhaustMap((action: FsqStartShiftAction) =>
                this.fsqManagementService.FsqStartShift(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqStartShiftFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Shift Started Successfully", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new GetAllShiftAction();
                        }
                    }),
                    catchError(error => of(new FsqStartShiftFailureAction({
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

    // Fsq Pause Shift
    FsqPauseShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Pause_Shift_Action),
            exhaustMap((action: FsqPauseShiftAction) =>
                this.fsqManagementService.FsqPauseShift(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqPauseShiftFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Shift Pause Successfully", "DISMISS", {
                                panelClass: ["Business_Errors-snackbar"],
                                duration: 3000
                            });
                            return new GetAllShiftAction();
                        }
                    }),
                    catchError(error => of(new FsqPauseShiftFailureAction({
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

    // Fsq Resume Shift
    FsqResumeShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Resume_Shift_Action),
            exhaustMap((action: FsqResumeShiftAction) =>
                this.fsqManagementService.FsqResumeShift(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqResumeShiftFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Shift Resume Successfully", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new GetAllShiftAction();
                        }
                    }),
                    catchError(error => of(new FsqResumeShiftFailureAction({
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

    // fsq End Shift
    FsqEndShift$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_End_Shift_Action),
            exhaustMap((action: FsqEndShiftAction) =>
                this.fsqManagementService.FsqEndShift(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqEndShiftFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Shift Ended Successfully", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new GetAllShiftAction();
                        }
                    }),
                    catchError(error => of(new FsqEndShiftFailureAction({
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
    //Update Fsq
    // fsq End Shift
    UpdateFsq$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Update_Fsq_Action),
            exhaustMap((action: UpdateFsqAction) =>
                this.fsqManagementService.UpdateFsq(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new UpdateFsqFailureAction(response.Errors)
                        }
                        else {
                            const snackbar = this._snackBar.open("Updated Successfully", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new UpdateFsqSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new UpdateFsqFailureAction({
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
    //Start Job 
    StartJob$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Start_Job_Action),
            mergeMap((action: StartJobAction) =>
                this.fsqManagementService.FsqStartJob(action.payload).pipe(
                    map((response) => {
                        console.log(response)
                        if (!!(<ErrorModel>response.Errors)) {
                            return new StartJobFailureAction(response.Errors)
                        } else if (response.code == "001") {
                            this.store.dispatch(new GetAssignvehicleAction({ fsq_shift_management_id: action.payload.fsq_shift_management_id }))
                            return new StartJobSuccessAction();
                        }
                    }),
                    catchError(error => of(new StartJobFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001",
                        }],
                    })))
                )
            )
        )
    );
    //Return Vehicle
    ReturnVehicle$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.FSQ_Return_Vehicle_Action),
            exhaustMap((action: FSQReturnVehicleAction) =>
                this.fsqManagementService.FsqReturnVehicle(action.payload).pipe(
                    map((response) => {
                        console.log(response)
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FSQReturnVehicleFailureAction(response.Errors)
                        } else if (response.code == "001") {
                            this.store.dispatch(new GetAllShiftAction());
                            return new FSQReturnVehicleSuccessAction();
                        }
                    }),
                    catchError(error => of(new FSQReturnVehicleFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001",
                        }],
                    })))
                )
            )
        )
    );
    //Return Vehicle
    ReturnRegion$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_Return_Region_Action),
            exhaustMap((action: GetReturnRegionAction) =>
                this.fsqManagementService.GetReturnRegion(action.payload).pipe(
                    map((response) => {
                        console.log(response)
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetReturnRegionFailureAction(response.Errors)
                        } else {
                            return new GetReturnRegionSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetReturnRegionFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001",
                        }],
                    })))
                )
            )
        )
    );
    //Return Vehicle
    ReturnRP$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Get_Return_RP_Action),
            exhaustMap((action: GetReturnRPAction) =>
                this.fsqManagementService.GetReturnRP(action.payload).pipe(
                    map((response) => {
                        console.log(response)
                        if (!!(<ErrorModel>response.Errors)) {
                            return new GetReturnRPFailureAction(response.Errors)
                        } else {
                            return new GetReturnRPSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetReturnRPFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [{
                            Code: "SE001",
                        }],
                    })))
                )
            )
        )
    );

    searchFsqLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Search_Load),
            mergeMap((action: FsqSearchLoadAction) =>
                this.fsqManagementService.SearchActiveFsq(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqSearchLoadFailureAction(response.Errors);
                        }
                        else {
                            return new FsqSearchLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new FsqSearchLoadFailureAction({
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

    // Rentalpoint Load
    fsqRentalpointLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(FSQManagementActionTypes.Fsq_Rentalpoint_Load),
            mergeMap((action: FsqRentalpointLoadAction) =>
                this.fsqManagementService.getRentalpointsByRegion(action.payload).pipe(
                    map((response) => {
                        console.log(response)
                        if (!!(<ErrorModel>response.Errors)) {
                            return new FsqRentalpointLoadFailureAction(response.Errors);
                        }
                        else {
                            return new FsqRentalpointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new FsqRentalpointLoadFailureAction({
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

    
 // Get Region By City
 getRegionByCity$ = createEffect(() => this.actions$
 .pipe(
     ofType(FSQManagementActionTypes.Get_Fsq_Region_By_City_Action),
     exhaustMap((action: GetFsqRegionByCityAction) =>
         this.fsqManagementService.getRegionbyCity(action.payload).pipe(
             map((response) => {
                 console.log(response);
                 if (!!(<ErrorModel>response.Errors)) {
                     return new GetFsqRegionByCityFailureAction(response.Errors)
                 }
                 else {
                     return new GetFsqRegionByCitySuccessAction(response);
                 }
             }),
             catchError(error => of(new GetFsqRegionByCityFailureAction({
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

TaskDetail$ = createEffect(() => this.actions$
 .pipe(
     ofType(FSQManagementActionTypes.Task_Details_List_Action),
     exhaustMap((action: TaskdetailsListAction) =>
         this.fsqManagementService.taskDetailsList(action.payload).pipe(
             map((response) => {
                 console.log(response);
                 if (!!(<ErrorModel>response.Errors)) {
                     return new TaskdetailsListFailureAction(response.Errors)
                 }
                 else {
                     return new TaskdetailsListSuccessAction(response);
                 }
             }),
             catchError(error => of(new TaskdetailsListFailureAction({
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
