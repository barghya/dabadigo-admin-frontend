import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PricingManagementService } from 'src/app/service/pricing-management/pricing-management.service';
import { Router } from '@angular/router';
import { PricingManagementActionTypes, PricingManagementLoadSuccessAction, PricingManagementLoadFailureAction, AddPricingLoadSuccessAction, AddPricingLoadFailureAction, AddPricingAction, AddPricingSuccessAction, AddPricingFailureAction, AddAnotherPricingAction, EditPricingLoadSuccessAction, EditPricingLoadFailureAction, EditPricingLoadAction, EditPricingAction, EditPricingFailureAction, EditPricingSuccessAction, DeletePricingAction, DeletePricingFailureAction, PricingManagementLoadAction, AddBatterySwapPricingLoadSuccessAction, AddBatterySwapPricingLoadFailureAction, AddBatterySwapPricingAction, AddBatterySwapPricingFailureAction, AddBatterySwapPricingSuccessAction, EditBatterySwapPricingLoadAction, EditBatterySwapPricingLoadSuccessAction, EditBatterySwapPricingLoadFailureAction, EditBatterySwapPricingAction, EditBatterySwapPricingSuccessAction, EditBatterySwapPricingFailureAction, DeleteBatterySwapPricingAction, DeleteBatterySwapPricingFailureAction } from '../actions/pricing_management.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RegionService } from 'src/app/service/region/region.service';
import { ErrorModel } from 'src/app/models/errorModel';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';

@Injectable()
export class PricingManagementEffects {
    constructor(private actions$: Actions, private pricingService: PricingManagementService, private router: Router, private domainService: DomainService, private regionService: RegionService,private corporateManagementService: CorporateManagementService) {}

    pricingMainLoad$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Pricing_Management_Load),
        mergeMap(() =>
            forkJoin([
                this.domainService.GetVehicleTypes(),
                this.regionService.getRegionList(),
                this.pricingService.getPricingList(),
                this.domainService.GetPricingTypes(),
                this.corporateManagementService.getAllCorporate(),
                this.pricingService.getbatterySwappricingList(),
                
            ]).pipe(
                map(data => { 
                    if(!!(<ErrorModel>data[0].Errors || <ErrorModel>data[3].Errors)){
                        if(data[0].Errors){
                            return new PricingManagementLoadFailureAction(data[0].Errors)
                        }
                        else if(data[3].Errors){
                            return new PricingManagementLoadFailureAction(data[3].Errors)
                        }
                    }
                    else{
                        return new PricingManagementLoadSuccessAction(data) 
                    }
                }),
                catchError(error => of(new PricingManagementLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingAddLoad$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Add_Pricing_Load),
        mergeMap(() =>
            forkJoin([
                this.domainService.GetVehicleTypes(),
                this.regionService.getRegionList(),
                this.domainService.GetPricingTypes(),
                this.corporateManagementService.getAllCorporate(),
            ]).pipe(
                map(data => { 
                    console.log(data);
                    if(!!(<ErrorModel>data[0].Errors || <ErrorModel>data[2].Errors)){
                        if(data[0].Errors){
                            return new AddPricingLoadFailureAction(data[0].Errors)
                        }
                        else if(data[2].Errors){
                            return new AddPricingLoadFailureAction(data[2].Errors)
                        }
                    }
                    else{
                        return new AddPricingLoadSuccessAction(data) 
                    }
                }),
                catchError(error => of(new AddPricingLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingAdd$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Add_Pricing),
        exhaustMap((action: AddPricingAction) =>
            this.pricingService.addPricing(action.payload)
            .pipe(
                map(response => {
                    console.log(response);
                    
                    if(!!(<ErrorModel>response.Errors)) {
                        return new AddPricingFailureAction(response.Errors);
                    }
                    else{
                        this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
                        return new AddPricingSuccessAction();
                    }
                }),
                catchError(error => of(new AddPricingFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingAddAnother$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Add_Another_Pricing),
        exhaustMap((action: AddAnotherPricingAction) =>
            this.pricingService.addPricing(action.payload)
            .pipe(
                map(response => {
                    console.log(response);
                    
                    if(!!(<ErrorModel>response.Errors)) {
                        return new AddPricingFailureAction(response.Errors);
                    }
                    else{
                        return new AddPricingSuccessAction();
                    }
                }),
                catchError(error => of(new AddPricingFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingEditLoad$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Edit_Pricing_Load),
        mergeMap((action: EditPricingLoadAction) =>
            forkJoin([
                this.domainService.GetVehicleTypes(),
                this.regionService.getRegionList(),
                this.pricingService.getSinglePricing(action.payload),
                this.domainService.GetPricingTypes(),
                this.corporateManagementService.getAllCorporate(),
            ]).pipe(
                map(data => { 
                    if(!!(<ErrorModel>data[0].Errors || <ErrorModel>data[2].Errors || <ErrorModel>data[3].Errors)){
                        if(data[0].Errors){
                            return new EditPricingLoadFailureAction(data[0].Errors)
                        }
                        else if(data[2].Errors){
                            return new EditPricingLoadFailureAction(data[2].Errors)
                        }
                        else if(data[3].Errors){
                            return new EditPricingLoadFailureAction(data[3].Errors)
                        }
                    }
                    else{
                        return new EditPricingLoadSuccessAction(data);
                    }
                }),
                catchError(error => of(new EditPricingLoadFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingEdit$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Edit_Pricing),
        exhaustMap((action: EditPricingAction) =>
            this.pricingService.editPricing(action.payload)
            .pipe(
                map(response => {
                    console.log(response);
                    
                    if(!!(<ErrorModel>response.Errors)) {
                        return new EditPricingFailureAction(response.Errors);
                    }
                    else{
                        this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
                        return new EditPricingSuccessAction();
                    }
                }),
                catchError(error => of(new EditPricingFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

    pricingDelete$ = createEffect(() => this.actions$.pipe(
        ofType(PricingManagementActionTypes.Delete_Pricing),
        exhaustMap((action: DeletePricingAction) =>
            this.pricingService.deletePricing(action.payload)
            .pipe(
                map(response => {
                    if(!!(<ErrorModel>response.Errors)) {
                        return new DeletePricingFailureAction(response.Errors);
                    }
                    else{
                        return new PricingManagementLoadAction();
                    }
                }),
                catchError(error => of(new DeletePricingFailureAction({
                    Info: [],
                    Business_Errors: [],
                    Warnings: [],
                    System_Errors: [
                        {
                            Code: "SE001"
                        }
                    ]
                }))))
            )
        )
    );

// Battery Swap pricing add load

BatterySwappricingAddLoad$ = createEffect(() => this.actions$.pipe(
    ofType(PricingManagementActionTypes.Add_Battery_Swap_Pricing_Load),
    mergeMap(() =>
        forkJoin([
            this.domainService.GetVehicleTypes(),
            this.regionService.getRegionList(),
            this.domainService.GetPricingTypes(),
            this.corporateManagementService.getAllCorporate(),
        ]).pipe(
            map(data => { 
                console.log(data);
                if(!!(<ErrorModel>data[0].Errors || <ErrorModel>data[2].Errors)){
                    if(data[0].Errors){
                        return new AddBatterySwapPricingLoadFailureAction(data[0].Errors)
                    }
                    else if(data[2].Errors){
                        return new AddBatterySwapPricingLoadFailureAction(data[2].Errors)
                    }
                }
                else{
                    return new AddBatterySwapPricingLoadSuccessAction(data) 
                }
            }),
            catchError(error => of(new AddBatterySwapPricingLoadFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);

// Battery Swap pricing add

BatterySwappricingAdd$ = createEffect(() => this.actions$.pipe(
    ofType(PricingManagementActionTypes.Add_Battery_Swap_Pricing),
    exhaustMap((action: AddBatterySwapPricingAction) =>
        this.pricingService.addbatteryswapPricing(action.payload)
        .pipe(
            map(response => {
                console.log(response);
                
                if(!!(<ErrorModel>response.Errors)) {
                    return new AddBatterySwapPricingFailureAction(response.Errors);
                }
                else{
                    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
                    return new AddBatterySwapPricingSuccessAction();
                }
            }),
            catchError(error => of(new AddBatterySwapPricingFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);

// Battery Swap pricing edit load
BatterySwappricingEditLoad$ = createEffect(() => this.actions$.pipe(
    ofType(PricingManagementActionTypes.Edit_Battery_Swap_Pricing_Load),
    mergeMap((action: EditBatterySwapPricingLoadAction) =>
        forkJoin([
            this.domainService.GetVehicleTypes(),
            this.regionService.getRegionList(),
            this.pricingService.getSinglebatteryswapPricing(action.payload),
            this.domainService.GetPricingTypes(),
            this.corporateManagementService.getAllCorporate(),
        ]).pipe(
            map(data => { 
                if(!!(<ErrorModel>data[0].Errors || <ErrorModel>data[2].Errors || <ErrorModel>data[3].Errors)){
                    if(data[0].Errors){
                        return new EditBatterySwapPricingLoadFailureAction(data[0].Errors)
                    }
                    else if(data[2].Errors){
                        return new EditBatterySwapPricingLoadFailureAction(data[2].Errors)
                    }
                    else if(data[3].Errors){
                        return new EditBatterySwapPricingLoadFailureAction(data[3].Errors)
                    }
                }
                else{
                    return new EditBatterySwapPricingLoadSuccessAction(data);
                }
            }),
            catchError(error => of(new EditBatterySwapPricingLoadFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);


BatterySwappricingEdit$ = createEffect(() => this.actions$.pipe(
    ofType(PricingManagementActionTypes.Edit_Battery_Swap_Pricing),
    exhaustMap((action: EditBatterySwapPricingAction) =>
        this.pricingService.editbatteryswapPricing(action.payload)
        .pipe(
            map(response => {
                console.log(response);
                
                if(!!(<ErrorModel>response.Errors)) {
                    return new EditPricingFailureAction(response.Errors);
                }
                else{
                    this.router.navigate(["pricing-management", "pricing-main"], { replaceUrl: true });
                    return new EditBatterySwapPricingSuccessAction();
                }
            }),
            catchError(error => of(new EditBatterySwapPricingFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);

BatterySwappricingDelete$ = createEffect(() => this.actions$.pipe(
    ofType(PricingManagementActionTypes.Delete_Battery_Swap_Pricing),
    exhaustMap((action: DeleteBatterySwapPricingAction) =>
        this.pricingService.deletebatteryswapPricing(action.payload)
        .pipe(
            map(response => {
                if(!!(<ErrorModel>response.Errors)) {
                    return new DeleteBatterySwapPricingFailureAction(response.Errors);
                }
                else{
                    return new PricingManagementLoadAction();
                }
            }),
            catchError(error => of(new DeleteBatterySwapPricingFailureAction({
                Info: [],
                Business_Errors: [],
                Warnings: [],
                System_Errors: [
                    {
                        Code: "SE001"
                    }
                ]
            }))))
        )
    )
);

}