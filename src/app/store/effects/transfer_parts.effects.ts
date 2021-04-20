import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { TransferPartsService } from 'src/app/service/transfer-parts/transfer-parts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TransferPartsActionTypes, TransferRequestLoadAction, TransferRequestLoadSuccessAction, TransferRequestLoadFailureAction, TransferRequestCreateAction, TransferRequestCreateFailureAction, TransferRequestCreateSuccessAction, TransferRequestApproveAction, TransferRequestApproveFailureAction, TransferRequestApproveSuccessAction, TransferRequestRejectAction, TransferRequestRejectFailureAction, TransferRequestRejectSuccessAction, TransferRequestDeleteAction, TransferRequestDeleteFailureAction, TransferRequestDeleteSuccessAction, TransferRequestCreateLoadAction, TransferRequestCreateLoadFailureAction, TransferRequestCreateLoadSuccessAction, PartsStockLoadAction, PartsStockLoadFailureAction, PartsStockLoadSuccessAction, TransferRequestRentalpointLoadAction, TransferRequestRentalpointLoadFailureAction, TransferRequestRentalpointLoadSuccessAction, TransferRequestFsqLoadAction, TransferRequestFsqLoadFailureAction, TransferRequestFsqLoadSuccessAction } from '../actions/transfer_parts.action';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { RegionService } from 'src/app/service/region/region.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { FsqManagementService } from 'src/app/service/fsq-management/fsq-management.service';

@Injectable()
export class PartsTransferEffects {
    constructor(private actions$: Actions, private router: Router, 
        private transferPartsService: TransferPartsService, 
        private assetInventoryService: AssetInventoryService, 
        private regionService: RegionService,
        private store: Store<AppState>,
        private domainService: DomainService,
        private rentalPointService: RentalPointService,
        private fsqhubService: FsqHubService,
        private fsqManagementService: FsqManagementService) { }

    transferPartsListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Load),
            mergeMap((action: TransferRequestLoadAction) =>
                this.transferPartsService.getAllTransferRequests(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestLoadFailureAction(response.Errors)
                        }
                        else {
                            return new TransferRequestLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestLoadFailureAction({
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

    transferPartsCreate$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Create),
            mergeMap((action: TransferRequestCreateAction) =>
                this.transferPartsService.createTransferRequest(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestCreateFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(["transfer-parts", "transfer-list"], {replaceUrl: true});
                            return new TransferRequestCreateSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestCreateFailureAction({
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

    transferPartsCreateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Create_Load),
            mergeMap((action: TransferRequestCreateLoadAction) =>
                forkJoin([
                    this.assetInventoryService.getPartsMasterList(),
                    this.regionService.getRegionList(),
                    this.domainService.GetStoreTypes(),
                    this.domainService.GetPartStatus(),
                    this.regionService.getCities(),
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[2].Errors)) {
                            return new TransferRequestCreateLoadFailureAction(response[2].Errors)
                        }
                        else if (!!(<ErrorModel>response[3].Errors)) {
                            return new TransferRequestCreateLoadFailureAction(response[3].Errors)
                        }
                        else {
                            return new TransferRequestCreateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestCreateLoadFailureAction({
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

    transferRequestRentalpointLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Rentalpoint_Load),
            mergeMap((action: TransferRequestRentalpointLoadAction) =>
                this.rentalPointService.getBatterySwapPointByRegion(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestRentalpointLoadFailureAction(response.Errors);
                        }
                        else {
                            return new TransferRequestRentalpointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestRentalpointLoadFailureAction({
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

    transferRequestFsqLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Fsq_Load),
            mergeMap((action: TransferRequestFsqLoadAction) =>
                this.fsqManagementService.SearchActiveFsq(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestFsqLoadFailureAction(response.Errors);
                        }
                        else {
                            return new TransferRequestFsqLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestFsqLoadFailureAction({
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

    partsStockLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Parts_Stock_Load),
            mergeMap((action: PartsStockLoadAction) =>
                this.assetInventoryService.getPartsStockFiltered(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new PartsStockLoadFailureAction(response.Errors)
                        }
                        else {
                            return new PartsStockLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsStockLoadFailureAction({
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

    transferPartsAccept$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Approve),
            mergeMap((action: TransferRequestApproveAction) =>
                this.transferPartsService.approveTransferRequest(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestApproveFailureAction(response.Errors)
                        }
                        else {
                            this.store.dispatch(new TransferRequestLoadAction({
                                past_flag: action.payload.past_flag
                            }))
                            return new TransferRequestApproveSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestApproveFailureAction({
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


    transferPartsReject$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Reject),
            mergeMap((action: TransferRequestRejectAction) =>
                this.transferPartsService.rejectTransferRequest(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestRejectFailureAction(response.Errors)
                        }
                        else {
                            this.store.dispatch(new TransferRequestLoadAction({
                                past_flag: action.payload.past_flag
                            }))
                            return new TransferRequestRejectSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestRejectFailureAction({
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


    transferPartsDelete$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferPartsActionTypes.Transfer_Request_Delete),
            mergeMap((action: TransferRequestDeleteAction) =>
                this.transferPartsService.deleteTransferRequest(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new TransferRequestDeleteFailureAction(response.Errors)
                        }
                        else {
                            this.store.dispatch(new TransferRequestLoadAction({
                                past_flag: action.payload.past_flag
                            }))
                            return new TransferRequestDeleteSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new TransferRequestDeleteFailureAction({
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