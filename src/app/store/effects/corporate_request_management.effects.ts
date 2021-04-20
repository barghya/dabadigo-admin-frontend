import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CorporateRequestManagementService } from 'src/app/service/corporate-request-management/corporate-request-management.service';
import { CorporateRequestManagementAction, CorporateRequestManagementLoadAction, CorporateRequestManagementLoadFailureAction, CorporateRequestManagementLoadSuccessAction, ApproveRequestAction, ApproveRequestFailureAction, CorporateRequestDetailLoad, CorporateRequestDetailLoadFailure, CorporateRequestDetailLoadSuccess, ApproveRequestSuccessAction, RejectRequestAction, RejectRequestFailureAction, RejectRequestSuccessAction } from '../actions/corporate_request_management.action';
import { mergeMap, map, catchError, take, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';

@Injectable()
export class CorporateRequestManagementEffects {
    constructor(private actions$: Actions, private corporateRequestService: CorporateRequestManagementService, private store: Store<AppState>, private router: Router) { }

    corporateRequestManagementListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateRequestManagementAction.Corporate_Request_Management_Load),
            mergeMap((action: CorporateRequestManagementLoadAction) =>
                this.corporateRequestService.getCorporateRequest(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)){
                            return new CorporateRequestManagementLoadFailureAction(response.Errors)
                        }
                        else{
                            return new CorporateRequestManagementLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CorporateRequestManagementLoadFailureAction({
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

    approveRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateRequestManagementAction.Approve_Request),
            exhaustMap((action: ApproveRequestAction) =>
                this.corporateRequestService.approveRequest(action.payload).pipe(
                    map((response) => {
                        if(!!<ErrorModel>response.Errors) {
                            return new ApproveRequestFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["corporate-request-management", "corporate-request-management-main"], {replaceUrl: true});
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

    rejectRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateRequestManagementAction.Reject_Request),
            exhaustMap((action: RejectRequestAction) =>
                this.corporateRequestService.rejectRequest(action.payload).pipe(
                    map((response) => {
                        if(!!<ErrorModel>response.Errors) {
                            return new RejectRequestFailureAction(response.Errors);
                        }
                        else {
                            this.router.navigate(["corporate-request-management", "corporate-request-management-main"], {replaceUrl: true});
                            return new RejectRequestSuccessAction();
                        }
                    }),
                    catchError(error => of(new RejectRequestFailureAction({
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


    detailLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CorporateRequestManagementAction.Corporate_Request_Detail_Load),
            mergeMap((action: CorporateRequestDetailLoad) =>
                this.corporateRequestService.getRequestDetail(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response.Errors)) {
                            return new CorporateRequestDetailLoadFailure(response.Errors)
                        }
                        else {
                            return new CorporateRequestDetailLoadSuccess(response);
                        }
                    }),
                    catchError(error => of(new CorporateRequestDetailLoadFailure({
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
    
}