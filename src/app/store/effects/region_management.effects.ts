import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/service/region/region.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { RegionManagementActionTypes, RegionManagementLoadAction, RegionManagementLoadSuccessAction, RegionManagementLoadFailureAction, AddRegionLoadAction, AddRegionLoadSuccessAction, AddRegionLoadFailureAction, AddRegionAction, AddRegionSuccessAction, AddRegionFailureAction, EditRegionLoadAction, EditRegionLoadSuccessAction, EditRegionLoadFailureAction, EditRegionAction, EditRegionSuccessAction, EditRegionFailureAction } from '../actions/region_management.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { RegionManagementComponent } from 'src/app/region-management/page/region-management/region-management.component';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { ErrorModel } from 'src/app/models/errorModel';

@Injectable()
export class RegionManagementEffects {
    constructor(private actions$: Actions, private router: Router, private assetInventoryService: AssetInventoryService, private regionService: RegionService) { }

    regionManagementListLoad$ = createEffect(() => this.actions$.pipe(
        ofType(RegionManagementActionTypes.Region_Management_Load),
        mergeMap((action: RegionManagementLoadAction) =>
            this.regionService.getRegionList().pipe(
                map((response) => {
                    console.log(response);
                    return new RegionManagementLoadSuccessAction(response);       
                }),
                catchError(error => of(new RegionManagementLoadFailureAction({
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



    regionManagementAddLoad$ = createEffect(() => this.actions$.pipe(
        ofType(RegionManagementActionTypes.Add_region_Load),
        mergeMap(() =>
            forkJoin([
                this.regionService.getRegionList(),
                this.assetInventoryService.GetCountries(),
                this.regionService.GetStates(),
                this.regionService.getCities()
            ]).pipe(
                map(data => { 
                    console.log(data);
                    return new AddRegionLoadSuccessAction(data)
                }),
                catchError(error => of(new AddRegionLoadFailureAction({
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

    regionManagementAdd$ = createEffect(() => this.actions$.pipe(
        ofType(RegionManagementActionTypes.Add_region_action),
        exhaustMap((action: AddRegionAction) =>
            this.regionService.addRegion(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    if(!!(<ErrorModel>response.Errors)){
                        return new AddRegionFailureAction(response.Errors);
                    }
                    else{
                        this.router.navigate(['region-management', 'region-management-main'], { replaceUrl: true });
                        return new AddRegionSuccessAction();
                    }
                   
                }),
                catchError(error => of(new AddRegionFailureAction({
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


    regionManagementEditLoad$ = createEffect(() => this.actions$.pipe(
        ofType(RegionManagementActionTypes.Edit_region_Load),
        mergeMap((action: EditRegionLoadAction) =>
            forkJoin([
                this.regionService.getRegionList(),
                this.regionService.getSingleRegion(action.payload),
                this.assetInventoryService.GetCountries(),
                this.regionService.GetStates(),
                this.regionService.getCities()
            ]).pipe(
                map(data => {
                    console.log(data);
                    if(!!(<ErrorModel>data[1].Errors)){
                        return new EditRegionLoadFailureAction(data[1].Errors)
                    }
                    else{
                        return new EditRegionLoadSuccessAction(data)
                    }
                }),
                catchError(error => of(new EditRegionLoadFailureAction({
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

    regionManagementEdit$ = createEffect(() => this.actions$.pipe(
        ofType(RegionManagementActionTypes.Edit_Region),
        exhaustMap((action: EditRegionAction) =>
            this.regionService.editRegion(action.payload)
                .pipe(
                    map(response => {

                        if(!!(<ErrorModel>response.Errors)) {
                            return new EditRegionFailureAction(response.Errors);
                        }
                        else{
                            this.router.navigate(['region-management', 'region-management-main'], { replaceUrl: true });
                            return new EditRegionSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditRegionFailureAction({
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


