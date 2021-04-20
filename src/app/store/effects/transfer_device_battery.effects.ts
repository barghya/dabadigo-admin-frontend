import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/service/region/region.service';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { DomainService } from 'src/app/service/domain/domain.service';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { TransferDeviceBatteryActionTypes, TransferDeviceBatteryRequestCreateLoadAction, TransferDeviceBatteryRequestCreateLoadFailureAction, TransferDeviceBatteryRequestCreateLoadSuccessAction, TransferDeviceBatteryRequestRentalpointLoadAction, TransferDeviceBatteryRequestRentalpointLoadFailureAction, TransferDeviceBatteryRequestRentalpointLoadSuccessAction, DeviceBatteryLoadAction, DeviceBatteryLoadSuccessAction, DeviceBatteryLoadFailureAction, BatteryDeviceTransferRequestCreateAction, BatteryDeviceTransferRequestCreateFailureAction, BatteryDeviceTransferRequestCreateSuccessAction, BatteryDeviceTransferRequestLoadAction, BatteryDeviceTransferRequestLoadFailureAction, BatteryDeviceTransferRequestLoadSuccessAction, SingleBatteryDeviceTransferRequestLoadAction, SingleBatteryDeviceTransferRequestLoadFailureAction, SingleBatteryDeviceTransferRequestLoadSuccessAction, MultiTransferAction, MultiTransferSuccessAction, MultiTransferFailureAction } from '../actions/transfer_device_battery.action';
import { ErrorModel } from 'src/app/models/errorModel';
import { forkJoin, of } from 'rxjs';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { TransferDeviceBatteryService } from 'src/app/service/transfer-device-battery/transfer-device-battery.service';

@Injectable()
export class TransferDeviceBatteryEffects {
    constructor(private actions$: Actions, 
        private router: Router,
        private regionService: RegionService,
        private store: Store<AppState>,
        private domainService: DomainService,
        private rentalPointService: RentalPointService,
        private transferDeviceBatteryService : TransferDeviceBatteryService
    ){}

    transferDeviceBatteryCreateLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Create_Load),
        mergeMap((action: TransferDeviceBatteryRequestCreateLoadAction) =>
            forkJoin([
                this.domainService.GetItemType(),
                this.regionService.getRegionList(),
                this.domainService.GetStoreTypes(),
                this.regionService.getCities(),
            ]).pipe(
                map((response) => {
                    if (!!(<ErrorModel>response[0].Errors)) {
                        return new TransferDeviceBatteryRequestCreateLoadFailureAction(response[0].Errors)
                    }
                    else if (!!(<ErrorModel>response[2].Errors)) {
                        return new TransferDeviceBatteryRequestCreateLoadFailureAction(response[2].Errors)
                    }else{
                        return new TransferDeviceBatteryRequestCreateLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new TransferDeviceBatteryRequestCreateLoadFailureAction({
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
    ofType(TransferDeviceBatteryActionTypes.Transfer_DeviceBattery_Request_Rentalpoint_Load),
    mergeMap((action: TransferDeviceBatteryRequestRentalpointLoadAction) =>
        this.rentalPointService.getBatterySwapPointByRegion(action.payload).pipe(
            map((response) => {
                if (!!(<ErrorModel>response.Errors)) {
                    return new TransferDeviceBatteryRequestRentalpointLoadFailureAction(response.Errors);
                }
                else {
                    return new TransferDeviceBatteryRequestRentalpointLoadSuccessAction(response);
                }
            }),
            catchError(error => of(new TransferDeviceBatteryRequestRentalpointLoadFailureAction({
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

BatteryDeviceStockLoad$ = createEffect(() => this.actions$
.pipe(
    ofType(TransferDeviceBatteryActionTypes.DeviceBattery_Stock_Load),
    mergeMap((action: DeviceBatteryLoadAction) =>
        this.transferDeviceBatteryService.getAllItems(action.payload).pipe(
            map((response) => {
                if (!!(<ErrorModel>response.Errors)) {
                    return new DeviceBatteryLoadFailureAction(response.Errors)
                }
                else {
                    return new DeviceBatteryLoadSuccessAction(response);
                }
            }),
            catchError(error => of(new DeviceBatteryLoadFailureAction({
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

transferbatteryDeviceCreate$ = createEffect(() => this.actions$
        .pipe(
            ofType(TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Create),
            mergeMap((action: BatteryDeviceTransferRequestCreateAction) =>
                this.transferDeviceBatteryService.createTransferRequest(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new BatteryDeviceTransferRequestCreateFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(["transfer-device-battery", "transfer-list"], {replaceUrl: true});
                            return new BatteryDeviceTransferRequestCreateSuccessAction();
                        }
                    }),
                    catchError(error => of(new BatteryDeviceTransferRequestCreateFailureAction({
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
    transferBatteryDeviceListLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(TransferDeviceBatteryActionTypes.BatteryDevice_Transfer_Request_Load),
        mergeMap((action: BatteryDeviceTransferRequestLoadAction) =>
            this.transferDeviceBatteryService.GetAllTransferRequestList(action.payload).pipe(
                map((response) => {
                    if (!!(<ErrorModel>response.Errors)) {
                        return new BatteryDeviceTransferRequestLoadFailureAction(response.Errors)
                    }
                    else {
                        return new BatteryDeviceTransferRequestLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new BatteryDeviceTransferRequestLoadFailureAction({
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
SingletransferBatteryDeviceListLoad$ = createEffect(() => this.actions$
.pipe(
    ofType(TransferDeviceBatteryActionTypes.Single_BatteryDevice_Transfer_Request_Load),
    mergeMap((action: SingleBatteryDeviceTransferRequestLoadAction) =>
        this.transferDeviceBatteryService.GetSingleTransferRequestList(action.payload).pipe(
            map((response) => {
                if (!!(<ErrorModel>response.Errors)) {
                    return new SingleBatteryDeviceTransferRequestLoadFailureAction(response.Errors)
                }
                else {
                    return new SingleBatteryDeviceTransferRequestLoadSuccessAction(response);
                }
            }),
            catchError(error => of(new SingleBatteryDeviceTransferRequestLoadFailureAction({
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

multiAction$ = createEffect(() => this.actions$
.pipe(
    ofType(TransferDeviceBatteryActionTypes.Multi_Transfer_Action),
    mergeMap((action: MultiTransferAction) =>
        this.transferDeviceBatteryService.multiTransfer(action.payload).pipe(
            map((response) => {
                if (!!(<ErrorModel>response.Errors)) {
                    return new MultiTransferFailureAction(response.Errors)
                }
                else {
                    this.store.dispatch(new BatteryDeviceTransferRequestLoadAction({active_flag: action.payload.active_flag}))
                    return new MultiTransferSuccessAction();
                }
            }),
            catchError(error => of(new MultiTransferFailureAction({
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