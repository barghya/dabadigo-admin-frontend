import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FsqHubService } from 'src/app/service/fsq-hub/fsq-hub.service';
import { FSQHubActionTypes, FSQHubListLoadAction, FSQHubListLoadSuccessAction, FSQHubListLoadFailureAction, AddFSQHubLoadAction, AddFSQHubLoadSuccessAction, AddFSQHubLoadFailureAction, AddFSQHubAction, AddFSQHubFailureAction, AddFSQHubSuccessAction, EditFSQHubLoadAction, EditFSQHubLoadFailureAction, EditFSQHubLoadSuccessAction, EditFSQHubAction, EditFSQHubSuccessAction, EditFSQHubFailureAction, RemoveRegionAction, RemoveRegionFailureAction, RemoveManagerAction, RemoveManagerFailureAction, AdminFSQHubListLoadAction, AdminFSQHubListLoadSuccessAction, AdminFSQHubListLoadFailureAction } from '../actions/fsq_hub.action';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { RegionService } from 'src/app/service/region/region.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { ErrorModel } from 'src/app/models/errorModel';

@Injectable()
export class FSQHubEffects {
    constructor(private actions$: Actions, private fsqHubService: FsqHubService, private router: Router, private store: Store<AppState>, private assetInventoryService: AssetInventoryService, private regionService: RegionService, private domainService: DomainService, ) { }


    fsqhubListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQHubActionTypes.FSQ_Hub_List_Load),
            mergeMap((action: FSQHubListLoadAction) =>
                this.fsqHubService.getHub(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        return new FSQHubListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new FSQHubListLoadFailureAction({
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

    adminfsqhubListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FSQHubActionTypes.Admin_FSQ_Hub_List_Load),
            mergeMap((action: AdminFSQHubListLoadAction) =>
                this.fsqHubService.getFSQHubList().pipe(
                    map((response) => {
                        console.log(response);
                        return new AdminFSQHubListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new AdminFSQHubListLoadFailureAction({
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

   
    FSQHubLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(FSQHubActionTypes.Add_FSQ_Hub_Load_Action),
        mergeMap((action: AddFSQHubLoadAction) =>
            forkJoin([
                this.fsqHubService.GetavailableRegions(),
                this.fsqHubService.GetavailableManagers(),
                this.assetInventoryService.GetCountries(),
                this.regionService.GetStates(),
                this.domainService.GetFSQHubStatus(),
                this.regionService.getCities(),
            ]).pipe(
                map((response) => {
                    console.log(response);
                    if (!!(<ErrorModel>response[4].Errors)) {
                            return new AddFSQHubLoadFailureAction(response[4].Errors)
                    }
                    else {
                        return new AddFSQHubLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new AddFSQHubLoadFailureAction({
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

addFSQHub$ = createEffect(() => this.actions$
.pipe(
    ofType(FSQHubActionTypes.Add_FSQ_Hub),
    mergeMap((action: AddFSQHubAction) =>
        this.fsqHubService.AddFSQHub(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new AddFSQHubFailureAction(response.Errors)
                }
                else {
                    this.router.navigate(['fsq-hub', 'fsq-hub']);
                    return new AddFSQHubSuccessAction();
                }
            }),
            catchError(error => of(new AddFSQHubFailureAction({
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


EditFSQHubLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(FSQHubActionTypes.Edit_FSQ_Hub_Load),
        mergeMap((action: EditFSQHubLoadAction) =>
            forkJoin([
                this.fsqHubService.GetavailableRegions(),
                this.fsqHubService.GetavailableManagers(),
                this.assetInventoryService.GetCountries(),
                this.regionService.GetStates(),
                this.domainService.GetFSQHubStatus(),
                this.fsqHubService.getSingleHub(action.payload),
                this.regionService.getCities(),
            ]).pipe(
                map((response) => {
                    console.log(response);
                    if (!!(<ErrorModel>response[4].Errors || <ErrorModel>response[5].Errors)) {
                            return new EditFSQHubLoadFailureAction(response[4].Errors)
                    }
                    else if (response[5].Errors) {
                        return new EditFSQHubLoadFailureAction(response[5].Errors)
                    }
                    else {
                        return new EditFSQHubLoadSuccessAction(response);
                    }
                }),
                catchError(error => of(new EditFSQHubLoadFailureAction({
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

editFSQHub$ = createEffect(() => this.actions$
.pipe(
    ofType(FSQHubActionTypes.Edit_FSQ_Hub),
    mergeMap((action: EditFSQHubAction) =>
        this.fsqHubService.EditFSQHub(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new EditFSQHubFailureAction(response.Errors)
                }
                else {
                    this.router.navigate(['fsq-hub', 'fsq-hub'], { replaceUrl: true });
                    return new EditFSQHubSuccessAction();
                }
            }),
            catchError(error => of(new EditFSQHubFailureAction({
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

RemoveRegion$ = createEffect(() => this.actions$
.pipe(
    ofType(FSQHubActionTypes.Remove_Region_Action),
    mergeMap((action: RemoveRegionAction) =>
        this.fsqHubService.RemoveRegion(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new RemoveRegionFailureAction(response.Errors)
                }
                else {
                    return new EditFSQHubLoadAction(action.payload);
                }
            }),
            catchError(error => of(new RemoveRegionFailureAction({
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

RemoveManager$ = createEffect(() => this.actions$
.pipe(
    ofType(FSQHubActionTypes.Remove_Manager_Action),
    mergeMap((action: RemoveManagerAction) =>
        this.fsqHubService.RemoveManager(action.payload).pipe(
            map((response) => {
                console.log(response);
                if (!!(<ErrorModel>response.Errors)) {
                    return new RemoveManagerFailureAction(response.Errors)
                }
                else {
                    return new EditFSQHubLoadAction(action.payload);
                }
            }),
            catchError(error => of(new RemoveManagerFailureAction({
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