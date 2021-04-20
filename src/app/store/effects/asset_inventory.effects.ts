import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { AssetInventoryActionTypes, AccessoriesListLoadAction, AccessoriesListLoadSuccessAction, AccessoriesListLoadFailureAction, BatteryListLoadSuccessAction, BatteryListLoadFailureAction, BatteryListLoadAction, DeviceLoadAction, DeviceLoadSuccessAction, DeviceLoadFailureAction, CreateBatteryAction, CreateBatterySuccessAction, CreateBatteryFailureAction, AddDeviceAction, AddDeviceSuccessAction, AddDeviceFailureAction, AddAnotherDeviceAction, EditDeviceAction, EditDeviceSuccessAction, EditDeviceFailureAction, EditDeviceLoadAction, EditDeviceLoadSuccessAction, EditDeviceLoadFailureAction, AddAnotherBatteryAction, EditBatteryLoadAction, EditBatteryLoadSuccessAction, EditBatteryLoadFailureAction, AddDeviceLoadAction, AddDeviceLoadSuccessAction, AddDeviceLoadFailureAction, DeleteDeviceAction, DeleteDeviceFailureAction, PartListLoadAction, PartListLoadSuccessAction, PartListLoadFailureAction, PartLoad, PartLoadSuccessAction, PartLoadFailureAction, AddPartAction, AddPartSuccessAction, AddPartFailureAction, AddAnotherPartsAction, EditPartLoadAction, EditPartLoadSuccessAction, EditPartLoadFailureAction, EditPartAction, EditPartSuccessAction, EditPartFailureAction, DeletePartAction, DeletePartFailureAction, BatteryLoad, BatteryLoadSuccessAction, BatteryLoadFailureAction, DeleteBatteryAction, DeleteBattteryFailureAction, EditBatteryAction, EditBatterySuccessAction, EditBatteryFailureAction, AddAssetLoadAction, AddAssetLoadSuccessAction, AddAssetLoadFailureAction, AddAnotherAssetAction, EditAssetLoadAction, EditAssetLoadSuccessAction, EditAssetLoadFailureAction, EditAssetAction, EditAssetSuccessAction, EditAssetFailureAction, AssetDetailLoad, AssetDetailLoadSuccess, AssetDetailLoadFailure, PartsMasterLoadAction, PartsMasterLoadSuccessAction, PartsMasterLoadFailureAction, PartsMasterCreateLoadSuccessAction, PartsMasterCreateLoadFailureAction, PartsMasterCreateAction, PartsMasterCreateSuccessAction, PartsMasterCreateFailureAction, PartsMasterCreateLoadAction, PartsMasterUpdateLoadAction, PartsMasterUpdateLoadFailureAction, PartsMasterUpdateLoadSuccessAction, PartsMasterUpdateAction, PartsMasterUpdateFailureAction, PartsMasterUpdateSuccessAction, PartsMasterDeleteAction, PartsMasterDeleteFailureAction, PartsMasterDeleteSuccessAction, PartsStockLoadAction, PartsStockLoadSuccessAction, PartsStockLoadFailureAction, PartsTransactionsLoadAction, PartsTransactionsLoadFailureAction, PartsTransactionsLoadSuccessAction, PartsStockAddLoadAction, PartsStockAddLoadSuccessAction, PartsStockAddLoadFailureAction, PartsStockAddAction, PartsStockAddSuccessAction, PartsStockAddFailureAction, VehicleTypesLoadAction, VehicleTypesLoadFailureAction, VehicleTypesLoadSuccessAction, PartsDefinitionLoadAction, PartsDefinitionLoadFailureAction, PartsDefinitionLoadSuccessAction, PartsDefinitionUpdateAction, PartsDefinitionUpdateFailureAction, PartsDefinitionUpdateSuccessAction, PartsRentalpointLoadAction, PartsRentalpointLoadFailureAction, PartsRentalpointLoadSuccessAction, PartsFsqLoadAction, PartsFsqLoadFailureAction, PartsFsqLoadSuccessAction, PartsFsqLoadByIdAction, PartsFsqLoadByIdFailureAction, PartsFsqLoadByIdSuccessAction, GetBatteryTransactionAction, GetBatteryTransactionFailureAction, GetBatteryTransactionSuccessAction, GetDeviceTransactionAction, GetDeviceTransactionFailureAction, GetDeviceTransactionSuccessAction } from '../actions/asset_inventory.action';
import { mergeMap, catchError, map, exhaustMap } from 'rxjs/operators';
import { DomainService } from 'src/app/service/domain/domain.service';
import { AssetListLoadAction, AssetListLoadSuccessAction, AssetListLoadFailureAction, AddAssetAction, AddAssetSuccessAction, AddAssetFailureAction } from '../actions/asset_inventory.action';
import { of, forkJoin } from 'rxjs';
import { Router } from '@angular/router'
import { ErrorModel } from 'src/app/models/errorModel';
import { PartsMasterItem } from 'src/app/models/asset-inventoryModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { RegionService } from 'src/app/service/region/region.service';
import { FsqManagementService } from 'src/app/service/fsq-management/fsq-management.service';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';
import { UserManagementService } from 'src/app/service/user-management/user-management.service';

@Injectable()
export class AssetInventoryEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private assetInventoryService: AssetInventoryService, private domainService: DomainService, private router: Router,
        private rentalPointService: RentalPointService,
        private fsqhubService: FsqHubService,
        private fsqManagementService: FsqManagementService,
        private regionService: RegionService,
        private userManagementService: UserManagementService) { }
    accessoriesCreation$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Accessories_List_Load),
            mergeMap((action: AccessoriesListLoadAction) =>
                this.assetInventoryService.GetAccessoriesList().pipe(
                    map((response) => {
                        console.log(response);
                        return new AccessoriesListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new AccessoriesListLoadFailureAction({
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

    //Asset Effects
    assetListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Asset_List_Load),
            mergeMap((action: AssetListLoadAction) =>
            forkJoin([
                this.assetInventoryService.GetAssetList(),
                this.domainService.GetOwnershipTypes(),
            ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[1].Errors)) {
                            if (response[1].Errors){
                                return new AssetListLoadFailureAction(response[1].Errors)
                            }
                        }
                        else {
                            return new AssetListLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AssetListLoadFailureAction({
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

    addAssetLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Asset_Load),
            mergeMap((action: AddAssetLoadAction) =>
                forkJoin([
                    this.domainService.GetVehicleTypes(),
                    this.domainService.GetVehicleStatus(),
                    this.assetInventoryService.GetAvailableBattery(),
                    this.assetInventoryService.GetAvailableDevices(),
                    this.assetInventoryService.GetAvailableParts(),
                    this.domainService.GetOwnershipTypes(),
                    this.regionService.getRegionList(),
                    this.assetInventoryService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities(),
                    // this.rentalPointService.GetavailableFranchise(),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors || <ErrorModel>response[3].Errors || <ErrorModel>response[4].Errors ||  <ErrorModel>response[5].Errors ||  <ErrorModel>response[6].Errors)) {
                            if (response[0].Errors) {
                                return new AddAssetLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors) {
                                return new AddAssetLoadFailureAction(response[1].Errors)
                            }
                            else if (response[2].Errors) {
                                return new AddAssetLoadFailureAction(response[2].Errors)
                            }
                            else if (response[3].Errors) {
                                return new AddAssetLoadFailureAction(response[3].Errors)
                            }
                            else if (response[4].Errors) {
                                return new AddAssetLoadFailureAction(response[4].Errors)
                            }
                            else if (response[5].Errors) {
                                return new AddAssetLoadFailureAction(response[5].Errors)
                            }
                            else if (response[6].Errors) {
                                return new AddAssetLoadFailureAction(response[6].Errors)
                            }
                        }
                        else {
                            return new AddAssetLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AddAssetLoadFailureAction({
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

    addAsset$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Asset),
            exhaustMap((action: AddAssetAction) =>
                this.assetInventoryService.AddAssetList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddAssetFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'assets-main']);
                            return new AddAssetSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddAssetFailureAction({
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

    addAnotherAsset$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Another_Asset),
            exhaustMap((action: AddAnotherAssetAction) =>
                this.assetInventoryService.AddAssetList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddAssetFailureAction(response.Errors)
                        }
                        else {
                            return new AddAssetSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddAssetFailureAction({
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

    editAssetLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Asset_Load),
            mergeMap((action: EditAssetLoadAction) =>
                forkJoin([
                    this.domainService.GetVehicleTypes(),
                    this.domainService.GetVehicleStatus(),
                    this.assetInventoryService.GetAvailableBattery(action.payload.vehicle_id),
                    this.assetInventoryService.GetAvailableDevices(action.payload.vehicle_id),
                    this.assetInventoryService.GetAvailableParts(action.payload.vehicle_id),
                    this.assetInventoryService.GetAssetByID(action.payload),
                    this.domainService.GetOwnershipTypes(),
                    this.regionService.getRegionList(),
                    this.assetInventoryService.GetCountries(),
                    this.regionService.GetStates(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors || <ErrorModel>response[3].Errors || <ErrorModel>response[4].Errors || <ErrorModel>response[5].Errors || <ErrorModel>response[6].Errors )) {
                            if (response[0].Errors) {
                                return new EditAssetLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors) {
                                return new EditAssetLoadFailureAction(response[1].Errors)
                            }
                            else if (response[2].Errors) {
                                return new EditAssetLoadFailureAction(response[2].Errors)
                            }
                            else if (response[3].Errors) {
                                return new EditAssetLoadFailureAction(response[3].Errors)
                            }
                            else if (response[4].Errors) {
                                return new EditAssetLoadFailureAction(response[4].Errors)
                            }
                            else if (response[5].Errors) {
                                return new EditAssetLoadFailureAction(response[5].Errors)
                            }
                            else if (response[6].Errors) {
                                return new EditAssetLoadFailureAction(response[6].Errors)
                            }
                        }
                        else {
                            return new EditAssetLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditAssetLoadFailureAction({
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


    editAsset$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Asset),
            exhaustMap((action: EditAssetAction) =>
                this.assetInventoryService.EditAsset(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditAssetFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'assets-main'], { replaceUrl: true });
                            return new EditAssetSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditAssetFailureAction({
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

    assetDetailLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Asset_Detail_Load),
            mergeMap((action: AssetDetailLoad) =>
                this.assetInventoryService.GetAssetDetailById(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (<ErrorModel>response.Errors) {
                            return new AssetDetailLoadFailure(response.Errors);
                        }
                        else {
                            return new AssetDetailLoadSuccess(response);
                        }
                    }),
                    catchError(error => of(new AssetDetailLoadFailure({
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
    )

    //Device

    deviceListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Device_List_Load),
            mergeMap((action: DeviceLoadAction) =>
                this.assetInventoryService.GetDeviceList().pipe(
                    map((response) => {
                        console.log(response);
                        return new DeviceLoadSuccessAction(response);
                    }),
                    catchError(error => of(new DeviceLoadFailureAction({
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

    addDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Device_Create),
            exhaustMap((action: AddDeviceAction) =>
                this.assetInventoryService.AddDeviceList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddDeviceFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'device-main']);
                            return new AddDeviceSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddDeviceFailureAction({
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

    addAnotherDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Another_Device_Create),
            exhaustMap((action: AddAnotherDeviceAction) =>
                this.assetInventoryService.AddDeviceList(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new AddDeviceFailureAction(response.Errors);
                        }
                        else {
                            return new AddDeviceSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddDeviceFailureAction({
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

    editDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Device_Action),
            exhaustMap((action: EditDeviceAction) =>
                this.assetInventoryService.EditDevice(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditDeviceFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'device-main']);
                            return new EditDeviceSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditDeviceFailureAction({
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

    editDeviceLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Device_Load),
            mergeMap((action: EditDeviceLoadAction) =>
                forkJoin([
                    this.domainService.GetDeviceStatus(),
                    this.assetInventoryService.GetCountries(),
                    this.assetInventoryService.GetDeviceByID(action.payload),
                    this.regionService.getRegionList(),
                    this.regionService.getCities(),
                    this.domainService.GetDeviceModels()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[2].Errors)) {
                            if (response[0].Errors) {
                                return new EditDeviceLoadFailureAction(response[0].Errors)
                            }
                            else if (response[2].Errors) {
                                return new EditDeviceLoadFailureAction(response[2].Errors)
                            }
                        }
                        else {
                            return new EditDeviceLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditDeviceLoadFailureAction({
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

    AddDeviceLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Device_Load_Action),
            mergeMap((action: AddDeviceLoadAction) =>
                forkJoin([
                    this.domainService.GetDeviceStatus(),
                    this.assetInventoryService.GetCountries(),
                    this.regionService.getRegionList(),
                    this.regionService.getCities(),
                    this.domainService.GetDeviceModels()
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[0].Errors)) {
                            return new AddDeviceLoadFailureAction(response[0].Errors)
                        }
                        else {
                            return new AddDeviceLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AddDeviceLoadFailureAction({
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

    DeleteDevice$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Delete_Device_Action),
            exhaustMap((action: DeleteDeviceAction) =>
                this.assetInventoryService.DeleteDevice(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeleteDeviceFailureAction(response.Errors)
                        }
                        else {
                            return new DeviceLoadAction();
                        }
                    }),
                    catchError(error => of(new DeleteDeviceFailureAction({
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

    //Get Device Transaction
    getDeviceTransaction$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Get_Device_Transactions_Action),
            mergeMap((action: GetDeviceTransactionAction) => 
                this.assetInventoryService.GetDeviceTransactionUrl(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new GetDeviceTransactionFailureAction(response.Errors);
                        } else {
                            return new GetDeviceTransactionSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetDeviceTransactionFailureAction({
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

    //Part Effects
    partList$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Part_List_Load),
            mergeMap((action: PartListLoadAction) =>
                this.assetInventoryService.GetPartsList().pipe(
                    map((response) => {
                        console.log(response);
                        return new PartListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new PartListLoadFailureAction({
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
    partLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Part_Load_Action),
            mergeMap((action: PartLoad) =>
                forkJoin([
                    this.assetInventoryService.GetCountries(),
                    this.domainService.GetVehiclePartState(),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[1].Errors)) {
                            return new PartLoadFailureAction(response[1].Errors)
                        }
                        else {
                            return new PartLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartLoadFailureAction({
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

    partCreation$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Part_Create_Action),
            mergeMap((action: AddPartAction) =>
                this.assetInventoryService.CreatePart(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Error) {
                            return new AddPartFailureAction(response);
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'part-main']);
                            return new AddPartSuccessAction()
                        }
                    }),
                    catchError(error => of(new AddPartFailureAction({
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

    addAnotherParts$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Another_Part_Action),
            mergeMap((action: AddAnotherPartsAction) =>
                this.assetInventoryService.CreatePart(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Error) {
                            return new AddPartFailureAction(response);
                        }
                        else {
                            return new AddPartSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddPartFailureAction({
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

    editPartLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Part_Load_Action),
            mergeMap((action: EditPartLoadAction) =>
                forkJoin([
                    this.domainService.GetVehiclePartState(),
                    this.assetInventoryService.GetCountries(),
                    this.assetInventoryService.GetPartByID(action.payload),
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[2].Errors)) {
                            if (response[0].Errors) {
                                return new EditPartLoadFailureAction(response[0].Errors)
                            }
                            else if (response[2].Errors) {
                                return new EditPartLoadFailureAction(response[2].Errors)
                            }
                        }
                        else {
                            return new EditPartLoadSuccessAction(response)
                        }
                    }),
                    catchError(error => of(new EditPartLoadFailureAction({
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

    editPart$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Part_Action),
            mergeMap((action: EditPartAction) =>
                this.assetInventoryService.EditPart(action.Payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditPartFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'part-main']);
                            return new EditPartSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditPartFailureAction({
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

    deletePart$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Delete_Part),
            exhaustMap((action: DeletePartAction) =>
                this.assetInventoryService.deletePart(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeletePartFailureAction(response.Errors);
                        }
                        else {
                            return new PartListLoadAction();
                        }
                    }),
                    catchError(error => of(new DeletePartFailureAction({
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

    //Battery Effects
    AddAnotherBattery$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Add_Another_Battery_Create),
            exhaustMap((action: AddAnotherBatteryAction) =>
                this.assetInventoryService.CreateBattery(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new CreateBatteryFailureAction(response.Errors);
                        }
                        else {
                            return new CreateBatterySuccessAction();
                        }
                    }),
                    catchError(error => of(new CreateBatteryFailureAction({
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

    addBattery$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Create_Battery),
            exhaustMap((action: CreateBatteryAction) =>
                this.assetInventoryService.CreateBattery(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new CreateBatteryFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'battery-main']);
                            return new CreateBatterySuccessAction();
                        }
                    }),
                    catchError(error => of(new CreateBatteryFailureAction({
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

    batteryListLoadAction$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Battery_List_Load),
            mergeMap((action: BatteryListLoadAction) =>
                this.assetInventoryService.GetBatteryList().pipe(
                    map((response) => {
                        console.log(response);
                        return new BatteryListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new BatteryListLoadFailureAction({
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

    addbatteryLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Battery_Load_Action),
            mergeMap((action: BatteryLoad) =>
                forkJoin([
                    this.assetInventoryService.GetCountries(),
                    this.domainService.GetBatteryStatus(),
                    this.regionService.getRegionList(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[1].Errors)) {
                            return new BatteryLoadFailureAction(response[1].Errors)
                        } else {
                            return new BatteryLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new BatteryLoadFailureAction({
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

    editBatteryLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Battery_Load),
            mergeMap((action: EditBatteryLoadAction) =>
                forkJoin([
                    this.assetInventoryService.GetCountries(),
                    this.domainService.GetBatteryStatus(),
                    this.assetInventoryService.GetBatteryByID(action.payload),
                    this.regionService.getRegionList(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors)) {
                            if (response[1].Errors) {
                                return new EditBatteryLoadFailureAction(response[1].Errors)
                            }
                            else if (response[2].Errors) {
                                return new EditBatteryLoadFailureAction(response[2].Errors)
                            }
                        }
                        else {
                            return new EditBatteryLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditBatteryLoadFailureAction({
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

    editBattery$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Edit_Battery_Action),
            exhaustMap((action: EditBatteryAction) =>
                this.assetInventoryService.UpdateBattery(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new EditBatteryFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['asset-inventory', 'battery-main']);
                            return new EditBatterySuccessAction();
                        }
                    }),
                    catchError(error => of(new EditBatteryFailureAction({
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

    deleteBattery = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Delete_Battery),
            exhaustMap((action: DeleteBatteryAction) =>
                this.assetInventoryService.DeleteBattery(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.Errors) {
                            return new DeleteBattteryFailureAction(response.Errors)
                        }
                        else {
                            return new BatteryListLoadAction();
                        }
                    }),
                    catchError(error => of(new DeleteBattteryFailureAction({
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

    //Get battery Transaction
    getBatteryTransaction$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Get_Battery_Transactions_Action),
            mergeMap((action: GetBatteryTransactionAction) => 
                this.assetInventoryService.GetBatteryTransactions(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new GetBatteryTransactionFailureAction(response.Errors);
                        } else {
                            return new GetBatteryTransactionSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetBatteryTransactionFailureAction({
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

    //Parts Master Effects
    partsMasterLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Load),
            mergeMap((action: PartsMasterLoadAction) =>
                this.assetInventoryService.getPartsMasterWithStockList().pipe(
                    map((response) => {
                        console.log(response);
                        return new PartsMasterLoadSuccessAction(response);
                    }),
                    catchError(error => of(new PartsMasterLoadFailureAction({
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

    partsMasterCreateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Create_Load),
            mergeMap((action: PartsMasterCreateLoadAction) =>
                this.assetInventoryService.GetCountries().pipe(
                    map((response) => {
                        console.log(response);
                        return new PartsMasterCreateLoadSuccessAction(response);
                    }),
                    catchError(error => of(new PartsMasterCreateLoadFailureAction({
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

    partsMasterCreate$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Create),
            exhaustMap((action: PartsMasterCreateAction) =>
                this.assetInventoryService.createPartsMaster(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response.Errors) {
                            return new PartsMasterCreateFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["asset-inventory", "parts-master-main"]);
                            return new PartsMasterCreateSuccessAction();
                        }
                    }),
                    catchError(error => of(new PartsMasterCreateFailureAction({
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

    partsMasterUpdateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Update_Load),
            mergeMap((action: PartsMasterUpdateLoadAction) =>
                forkJoin([
                    this.assetInventoryService.GetCountries(),
                    this.assetInventoryService.getSinglePartsMaster(action.payload)
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response[1].Errors) {
                            return new PartsMasterUpdateLoadFailureAction(response[1].Errors);
                        }
                        else {
                            return new PartsMasterUpdateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsMasterUpdateLoadFailureAction({
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

    partsMasterUpdate$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Update),
            exhaustMap((action: PartsMasterUpdateAction) =>
                this.assetInventoryService.updatePartsMaster(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response.Errors) {
                            return new PartsMasterUpdateFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["asset-inventory", "parts-master-main"]);
                            return new PartsMasterUpdateSuccessAction();
                        }
                    }),
                    catchError(error => of(new PartsMasterUpdateFailureAction({
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

    partsMasterDelete$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Master_Delete),
            exhaustMap((action: PartsMasterDeleteAction) =>
                this.assetInventoryService.deletePartsMaster(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (<ErrorModel>response.Errors) {
                            return new PartsMasterDeleteFailureAction(response.Errors);
                        }
                        else {
                            this.store.dispatch(new PartsMasterLoadAction());
                            return new PartsMasterDeleteSuccessAction();
                        }
                    }),
                    catchError(error => of(new PartsMasterDeleteFailureAction({
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

    partsStockLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Stock_Load),
            mergeMap((action: PartsStockLoadAction) =>
                this.assetInventoryService.getPartsStockFiltered(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new PartsStockLoadFailureAction(response.Errors);
                        }
                        else {
                            return new PartsStockLoadSuccessAction(response);
                        }
                        
                    }),
                    catchError(error => of(new PartsStockLoadFailureAction({
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

    partsStockAddLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Stock_Add_Load),
            mergeMap((action: PartsStockAddLoadAction) =>
                forkJoin([
                    this.assetInventoryService.getPartsMasterList(),
                    this.regionService.getRegionList(),
                    this.domainService.GetStoreTypes(),
                    this.domainService.GetPartStatus(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response[2].Errors)) {
                            return new PartsStockAddLoadFailureAction(response[2].Errors)
                        }
                        else if (!!(<ErrorModel>response[3].Errors)) {
                            return new PartsStockAddLoadFailureAction(response[3].Errors)
                        }
                        else {
                            return new PartsStockAddLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsStockAddLoadFailureAction({
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

    partsStockAdd$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Stock_Add),
            mergeMap((action: PartsStockAddAction) =>
                this.assetInventoryService.partsStocksAdd(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new PartsStockAddFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(["asset-inventory", "parts-inventory"], {replaceUrl: true, queryParams: { id: action.payload.parts_master_id }});
                            return new PartsStockAddSuccessAction();
                        }
                    }),
                    catchError(error => of(new PartsStockAddFailureAction({
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

    partsTransactionLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Transactions_Load),
            mergeMap((action: PartsTransactionsLoadAction) =>
                this.assetInventoryService.getPartsTransactions(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new PartsTransactionsLoadFailureAction(response.Errors);
                        }
                        else {
                            return new PartsTransactionsLoadSuccessAction(response);
                        }

                    }),
                    catchError(error => of(new PartsTransactionsLoadFailureAction({
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

    partsTypeLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Vehicle_Types_Load),
            mergeMap((action: VehicleTypesLoadAction) =>
                forkJoin([
                    this.domainService.GetVehicleTypes(),
                    this.assetInventoryService.getPartsMasterList()
                ]).pipe(
                    map((response) => {
                        if (<ErrorModel>response[0].Errors) {
                            return new VehicleTypesLoadFailureAction(response[0].Errors);
                        }
                        else {
                            return new VehicleTypesLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new VehicleTypesLoadFailureAction({
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

    partsRentalpointLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Rentalpoint_Load),
            mergeMap((action: PartsRentalpointLoadAction) =>
                this.rentalPointService.getRentalpointsByRegion(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new PartsRentalpointLoadFailureAction(response.Errors);
                        }
                        else {
                            return new PartsRentalpointLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsRentalpointLoadFailureAction({
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

    partsFsqLoadAction = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Fsq_Load),
            mergeMap((action: PartsFsqLoadAction) =>
                this.fsqManagementService.SearchActiveFsq(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new PartsFsqLoadFailureAction(response.Errors);
                        }
                        else {
                            return new PartsFsqLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsFsqLoadFailureAction({
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

    partsFsqLoadByIdAction = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Fsq_Load_ById),
            mergeMap((action: PartsFsqLoadByIdAction) =>
                this.userManagementService.GetUserByID({ admn_user_id: action.payload }).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new PartsFsqLoadByIdFailureAction(response.Errors);
                        }
                        else {
                            return new PartsFsqLoadByIdSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new PartsFsqLoadByIdFailureAction({
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

    partsDefinitionLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Definition_Load),
            mergeMap((action: PartsDefinitionLoadAction) =>
                this.assetInventoryService.getPartsDefinitionByVehicleType(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new PartsDefinitionLoadFailureAction(response.Errors);
                        }
                        else {
                            return new PartsDefinitionLoadSuccessAction(response);
                        }

                    }),
                    catchError(error => of(new PartsDefinitionLoadFailureAction({
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
    
    
    partsDefinitionUpdate$ = createEffect(() => this.actions$
        .pipe(
            ofType(AssetInventoryActionTypes.Parts_Definition_Update),
            mergeMap((action: PartsDefinitionUpdateAction) =>
                this.assetInventoryService.updatePartsDefinition(action.payload).pipe(
                    map((response) => {
                        if (<ErrorModel>response.Errors) {
                            return new PartsDefinitionUpdateFailureAction(response.Errors);
                        }
                        else {
                            this.store.dispatch(new PartsDefinitionLoadAction({
                                vehicle_type_id: action.payload.vehicle_type_id
                            }));
                            return new PartsDefinitionUpdateSuccessAction();
                        }

                    }),
                    catchError(error => of(new PartsDefinitionUpdateFailureAction({
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
}