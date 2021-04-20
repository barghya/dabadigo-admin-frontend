import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, take, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { CustomerManagementActionTypes, CustomerManagementListLoadAction, CustomerManagementListLoadSuccessAction, CustomerManagementListLoadFailureAction, ActiveAction, ActiveFailureAction, InactiveAction, InactiveFailureAction, ActiveSuccessAction, InactiveSuccessAction, CustomerDetailLoadAction, CustomerDetailLoadFailureAction, CustomerDetailLoadSuccessAction } from '../actions/customer_management.action';
import { CustomerManagementService } from 'src/app/service/customer-management/customer-management.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CustomerManagementEffects {
    constructor(private actions$: Actions, private _snackBar: MatSnackBar, private customerManagementService: CustomerManagementService, private store: Store<AppState>) { }

    customerManagementListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(CustomerManagementActionTypes.Customer_Management_List_Load),
            mergeMap((action: CustomerManagementListLoadAction) =>
                this.customerManagementService.getCustomer(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        return new CustomerManagementListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new CustomerManagementListLoadFailureAction({
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
            ofType(CustomerManagementActionTypes.Activate_Request),
            exhaustMap((action: ActiveAction) =>
                this.customerManagementService.activeRequest(action.payload).pipe(
                    map((response) => {
                        if (!!<ErrorModel>response.Errors) {
                            return new ActiveFailureAction(response.Errors);
                        }
                        else {
                            this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                                admn_user_id => {
                                    this.store.dispatch(new CustomerManagementListLoadAction(admn_user_id))
                                }
                            )
                            const snackbar = this._snackBar.open("Customer Activate Successfully.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new ActiveSuccessAction();
                        }
                    }),
                    catchError(error => of(new ActiveFailureAction({
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
            ofType(CustomerManagementActionTypes.Inactivate_Request),
            exhaustMap((action: InactiveAction) =>
                this.customerManagementService.inactiveRequest(action.payload).pipe(
                    map((response) => {
                        if (!!<ErrorModel>response.Errors) {
                            return new InactiveFailureAction(response.Errors);
                        }
                        else {
                            this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
                                admn_user_id => {
                                    this.store.dispatch(new CustomerManagementListLoadAction(admn_user_id))
                                }
                            )
                            const snackbar = this._snackBar.open("Customer Deactivate Successfully.", "DISMISS", {
                                panelClass: ["info-snackbar"],
                                duration: 3000
                            });
                            return new InactiveSuccessAction();
                        }
                    }),
                    catchError(error => of(new InactiveFailureAction({
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

    getSingleCustomer$ = createEffect(() => this.actions$
        .pipe(
            ofType(CustomerManagementActionTypes.Customer_Detail_Load),
            mergeMap((action: CustomerDetailLoadAction) =>
                this.customerManagementService.getSingleCustomer(action.payload).pipe(
                    map((response) => {
                        if (!!<ErrorModel>response.Errors) {
                            return new CustomerDetailLoadFailureAction(response.Errors);
                        }
                        else {
                            return new CustomerDetailLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new CustomerDetailLoadFailureAction({
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