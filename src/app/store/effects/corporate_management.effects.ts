import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { CorporateManagementAction, CorporateManagementLoadAction, CorporateManagementLoadFailureAction, CorporateManagementLoadSuccessAction, AddCorporateLoadAction, AddCorporateLoadSuccessAction, AddCorporateLoadFailureAction, EditCorporateLoadAction, EditCorporateLoadSuccessAction, EditCorporateLoadFailureAction, AddCorporateAction, AddCorporateSuccessAction, AddCorporateFailureAction, AddAnotherCorporateAction, EditCorporateAction, EditCorporateSuccessAction, EditCorporateFailureAction} from '../actions/corporate_management.action';
import { of, forkJoin } from 'rxjs';
import { DomainService } from 'src/app/service/domain/domain.service';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { Router } from '@angular/router';
import { ErrorModel } from 'src/app/models/errorModel';
import { RegionService } from 'src/app/service/region/region.service';

@Injectable()
export class CorporateManagementEffects {
    constructor(private actions$: Actions, private corporateManagementService: CorporateManagementService, private domainService: DomainService, private assetInventoryService: AssetInventoryService, private router: Router, private regionService: RegionService) { }
    
    corporateManagementListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Corporate_Management_Load),
            mergeMap((action: CorporateManagementLoadAction) =>
                forkJoin([
                    this.corporateManagementService.getAllCorporate(),
                    this.domainService.GetPartnerType(),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[1].Errors)){
                            if(response[1].Errors){
                                return new CorporateManagementLoadFailureAction(response[1].Errors)
                            }
                        }
                        else{
                            return new CorporateManagementLoadSuccessAction(response);   
                        }
                    }),
                    catchError(error => of(new CorporateManagementLoadFailureAction({
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

    addCorporateManagementLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Add_Corporate_Management_Load_Action),
            mergeMap((action: AddCorporateLoadAction) =>
                forkJoin([
                    this.domainService.GetPartnerType(),
                    this.domainService.GetPartnerCategory(),
                    this.assetInventoryService.GetCountries(),
                    this.domainService.GetCorporateSize(),
                    this.domainService.GetCorporateContract(),
                    this.domainService.GetBilling(),
                    this.regionService.GetStates(),
                    this.domainService.GetPaymentTerm(),
                    this.regionService.getCities()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[3].Errors || <ErrorModel>response[4].Errors || <ErrorModel>response[5].Errors)){
                            if(response[0].Errors){
                                return new AddCorporateLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors){
                                return new AddCorporateLoadFailureAction(response[1].Errors)
                            }
                            else if (response[3].Errors){
                                return new AddCorporateLoadFailureAction(response[3].Errors)
                            }
                            else if (response[4].Errors){
                                return new AddCorporateLoadFailureAction(response[4].Errors)
                            }
                            else if (response[5].Errors){
                                return new AddCorporateLoadFailureAction(response[5].Errors)
                            }
                        }
                        else{
                            return new AddCorporateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new AddCorporateLoadFailureAction({
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


    addCorporateManagement$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Add_Corporate_Management_Action),
            exhaustMap((action: AddCorporateAction) =>
                this.corporateManagementService.CreateCorporate(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)){
                            return new AddCorporateFailureAction(response.Errors)
                        }
                        else{
                            this.router.navigate(['corporate-management', 'corporate-management-main']);
                            return new AddCorporateSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddCorporateFailureAction({
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


    addAnotherCorporateManagement$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Add_Another_Corporate_Management_Action),
            exhaustMap((action: AddAnotherCorporateAction) =>
                this.corporateManagementService.CreateCorporate(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!<ErrorModel>response.error) {
                            return new AddCorporateFailureAction(response);
                        }
                        else {
                            return new AddCorporateSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddCorporateFailureAction({
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

    editCorporateManagementLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Edit_Corporate_Load),
            mergeMap((action: EditCorporateLoadAction) =>
                forkJoin([
                    this.corporateManagementService.getACorporate(action.payload),
                    this.domainService.GetPartnerType(),
                    this.domainService.GetPartnerCategory(),
                    this.assetInventoryService.GetCountries(),
                    this.domainService.GetCorporateSize(),
                    this.domainService.GetCorporateContract(),
                    this.domainService.GetBilling(),
                    this.regionService.GetStates(),
                    this.domainService.GetPaymentTerm(),
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[2].Errors || <ErrorModel>response[4].Errors || <ErrorModel>response[5].Errors || <ErrorModel>response[6].Errors)){
                            if(response[0].Errors){
                                return new EditCorporateLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors){
                                return new EditCorporateLoadFailureAction(response[1].Errors)
                            }
                            else if (response[2].Errors){
                                return new EditCorporateLoadFailureAction(response[2].Errors)
                            }
                            else if (response[4].Errors){
                                return new EditCorporateLoadFailureAction(response[4].Errors)
                            }
                            else if (response[5].Errors){
                                return new EditCorporateLoadFailureAction(response[5].Errors)
                            }
                            else if (response[6].Errors){
                                return new EditCorporateLoadFailureAction(response[6].Errors)
                            }
                            else if (response[8].Errors){
                                return new EditCorporateLoadFailureAction(response[8].Errors)
                            }
                        }
                        else{
                            return new EditCorporateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new EditCorporateLoadFailureAction({
                        Info: [],
                        System_Errors: [{
                            Code: "SE001"
                        }],
                        Business_Errors: [],
                        Warnings: []
                    })))
                )
            )
        )
    );


    editCorporateManagement$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateManagementAction.Edit_Corporate),
            exhaustMap((action: EditCorporateAction) =>
                this.corporateManagementService.updatecorporate(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)){
                            return new EditCorporateFailureAction(response.Errors)
                        }
                        else{
                            this.router.navigate(['corporate-management', 'corporate-management-main']);
                            return new EditCorporateSuccessAction();
                        }
                    }),
                    catchError(error => of(new EditCorporateFailureAction({
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