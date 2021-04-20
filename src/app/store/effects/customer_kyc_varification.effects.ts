import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, take, exhaustMap } from 'rxjs/operators';
import { of ,forkJoin, } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatSnackBar } from '@angular/material';

import { CustomerKycVarificationActionTypes, CustomerKycDetailLoadAction, CustomerKycDetailLoadSuccessAction, CustomerKycDetailLoadFailureAction, CustomerKycListLoadAction, CustomerKycListLoadSuccessAction, CustomerKycListLoadFailureAction, ActiveKycAction, ActiveKycFailureAction, ActiveKycSuccessAction, InactiveKycAction, InactiveKycFailureAction, InactiveKycSuccessAction, ApproveRequestAction, ApproveRequestSuccessAction, ApproveRequestFailureAction } from '../actions/customer_kyc_varification.action';
import { CustomerManagementService } from 'src/app/service/customer-management/customer-management.service';
import { CustomerKycVarificationService } from 'src/app/service/customer-kyc-varification-service/customer-kyc-varification.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomerKycVarificationEffects {
    constructor(private router: Router,private actions$: Actions, private _snackBar: MatSnackBar,private customerManagementService: CustomerManagementService, private store: Store<AppState>,private customerKycVarificationService: CustomerKycVarificationService,) { }

    customerManagementListLoad$ = createEffect(() => this.actions$
    .pipe(
        ofType(CustomerKycVarificationActionTypes.Customer_Kyc_List_Load),
        mergeMap((action: CustomerKycListLoadAction) =>
            this.customerKycVarificationService.getCustomer(action.payload).pipe(
                map((response) => {
                    console.log(response);
                    return new CustomerKycListLoadSuccessAction(response);
                }),
                catchError(error => of(new CustomerKycListLoadFailureAction({
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

activeRequest$ = createEffect(() => this.actions$
    .pipe(
        ofType(CustomerKycVarificationActionTypes.Activate_Kyc_Request),
        exhaustMap((action: ActiveKycAction) =>
            this.customerKycVarificationService.activeRequest(action.payload).pipe(
                map((response) => {
                    if (!!<ErrorModel>response.Errors) {
                        return new ActiveKycFailureAction(response.Errors);
                    }
                    else {
                        this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                            admn_user_id => {
                                this.store.dispatch(new CustomerKycListLoadAction(admn_user_id))
                            }
                        )
                        const snackbar = this._snackBar.open("Customer Activate Successfully.", "DISMISS", {
                            panelClass: ["info-snackbar"],
                            duration: 3000
                        });
                        return new ActiveKycSuccessAction();
                    }
                }),
                catchError(error => of(new ActiveKycFailureAction({
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

inactiveRequest$ = createEffect(() => this.actions$
    .pipe(
        ofType(CustomerKycVarificationActionTypes.Inactivate_Kyc_Request),
        exhaustMap((action: InactiveKycAction) =>
            this.customerKycVarificationService.inactiveRequest(action.payload).pipe(
                map((response) => {
                    if (!!<ErrorModel>response.Errors) {
                        return new InactiveKycFailureAction(response.Errors);
                    }
                    else {
                        this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                            admn_user_id => {
                                this.store.dispatch(new CustomerKycListLoadAction(admn_user_id))
                            }
                        )
                        const snackbar = this._snackBar.open("Customer Deactivate Successfully.", "DISMISS", {
                            panelClass: ["info-snackbar"],
                            duration: 3000
                        });
                        return new InactiveKycSuccessAction();
                    }
                }),
                catchError(error => of(new InactiveKycFailureAction({
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



    getSinglekycCustomer$ = createEffect(() => this.actions$
        .pipe(
            ofType(CustomerKycVarificationActionTypes.Customer_Kyc_Detail_Load),
            mergeMap((action: CustomerKycDetailLoadAction) =>
            forkJoin([
                this.customerManagementService.getSingleCustomer(action.payload),
                this.customerKycVarificationService.getKycUrl(action.payload)
            ]).pipe(
                    map((response) => {
                        console.log(response);
                        if (!!(<ErrorModel>response[0].Errors || <ErrorModel>response[1].Errors)) {
                            if (response[0].Errors) {
                                return new CustomerKycDetailLoadFailureAction(response[0].Errors)
                            }
                            else if (response[1].Errors) {
                                return new CustomerKycDetailLoadFailureAction(response[1].Errors)
                            }
                        }
                        else {
                            return new CustomerKycDetailLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CustomerKycDetailLoadFailureAction({
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
        ofType(CustomerKycVarificationActionTypes.Approve_Request),
        mergeMap((action: ApproveRequestAction) =>
            this.customerKycVarificationService.approveRequest(action.payload).pipe(
                map((response) => {
                    if (!!<ErrorModel>response.Errors) {
                        return new ApproveRequestFailureAction(response.Errors);
                    }
                    else {
                        this.router.navigate(['customer-kyc-verification', 'customer-kyc-verification-main']);
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


                }