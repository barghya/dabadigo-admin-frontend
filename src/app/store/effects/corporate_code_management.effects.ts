import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CorporateCodeManagementService } from 'src/app/service/corporate-code-management/corporate-code-management.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Router } from '@angular/router';
import { CorporateCodeManagementActionTypes, CodeListLoadAction, CodeListLoadSuccessAction, CodeListLoadFailureAction, CreateCodeLoadAction, CreateCodeLoadSuccessAction, CreateCodeLoadFailureAction, CreateCodeAction, CreateCodeSuccessAction, CreateCodeFailureAction, UpdateCodeLoadAction, UpdateCodeLoadSuccessAction, UpdateCodeLoadFailureAction, UpdateCodeAction, UpdateCodeSuccessAction, UpdateCodeFailureAction, DeleteCodeAction, DeleteCodeFailureAction, CreateAnotherCorporateCode } from '../actions/corporate_code_management.action';
import { mergeMap, catchError, map, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { CorporateManagementService } from 'src/app/service/corporate-management/corporate-management.service';
import { ErrorModel } from 'src/app/models/errorModel';

@Injectable()
export class CorporateCodeManagementEffects {

    constructor(private actions$: Actions, private corporateManagementService: CorporateManagementService, private corporateCodeManagementService: CorporateCodeManagementService, private domainService: DomainService, private router: Router) { }
    //Code List Load
    corporatecodeListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Code_List_Load),
            mergeMap((action: CodeListLoadAction) =>
                this.corporateCodeManagementService.GetCodeList().pipe(
                    map((response) => {
                        console.log(response);
                        return new CodeListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new CodeListLoadFailureAction({
                        Info: [],
                        Business_Errors: [],
                        Warnings: [],
                        System_Errors: [
                            {
                                Code: "SE0001"
                            }
                        ],
                    })))
                )
            )
        )
    );
    //Create Code Load Effects
    corporatecodeAddLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Create_Code_Load_Action),
            mergeMap((action: CreateCodeLoadAction) =>
                forkJoin([
                    this.domainService.GetCodeType(),
                    this.domainService.GetCodeStatus(),
                    this.corporateManagementService.getAllCorporate()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors)){
                            if(response[0].Errors){
                                return new CreateCodeLoadFailureAction(response[0].Errors)
                            }
                            else if(response[1].Errors){
                                return new CreateCodeLoadFailureAction(response[1].Errors)
                            }
                        }
                        else{
                            return new CreateCodeLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CreateCodeLoadFailureAction({
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
    //Create Code Action Effects
    corporatecodecreation$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Create_Code_Action),
            exhaustMap((action: CreateCodeAction) =>
                this.corporateCodeManagementService.CreateCode(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new CreateCodeFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(['corporate-code-management', 'code-list']);
                            return new CreateCodeSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CreateCodeFailureAction({
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
    //Create Another Corporate Code
    createAnotherCorporateCode$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Create_Another_Corporate_Code),
            exhaustMap((action: CreateAnotherCorporateCode) =>
                this.corporateCodeManagementService.CreateCode(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new CreateCodeLoadFailureAction(response.Errors)
                        }
                        else {
                            return new CreateCodeSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CreateCodeLoadFailureAction({
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
    //Edit Corporate Code Management Load
    codeEditLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Update_Code_Load_Action),
            mergeMap((action: UpdateCodeLoadAction) =>
                forkJoin([
                    this.domainService.GetCodeType(),
                    this.domainService.GetCodeStatus(), 
                    this.corporateManagementService.getAllCorporate(),
                    this.corporateCodeManagementService.GetCodeById(action.payload)
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors || <ErrorModel>response[3].Errors)){
                            if(response[0].Errors){
                                return new UpdateCodeLoadFailureAction(response[0].Errors)
                            }
                            else if(response[1].Errors){
                                return new UpdateCodeLoadFailureAction(response[1].Errors)
                            }
                            else if(response[3].Errors){
                                return new UpdateCodeLoadFailureAction(response[3].Errors)
                            }
                        }
                        else{
                            return new UpdateCodeLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new UpdateCodeLoadFailureAction({
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

    //Edit Corporate Code
    editCorporateCode$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Update_Code_Action),
            exhaustMap((action: UpdateCodeAction) =>
                this.corporateCodeManagementService.UpdateCode(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new UpdateCodeFailureAction(response.Errors)
                        }
                        else {
                            this.router.navigate(['corporate-code-management', 'code-list']);
                            return new UpdateCodeSuccessAction();
                        }
                    }),
                    catchError(error => of(new UpdateCodeFailureAction({
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

    deleteCode$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateCodeManagementActionTypes.Delete_Code_Action),
            exhaustMap((action: DeleteCodeAction) =>
                this.corporateCodeManagementService.DeleteCorporateCode(action.payload).pipe(
                    map((response) => {
                        if (!!(<ErrorModel>response.Errors)) {
                            return new DeleteCodeFailureAction(response.Errors)
                        }
                        else {
                            console.log(response);
                            return new CodeListLoadAction();
                        }
                    }),
                    catchError(error => of(new DeleteCodeFailureAction({
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