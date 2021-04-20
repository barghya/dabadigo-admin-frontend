import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { ErrorModel } from 'src/app/models/errorModel';
import { MatSnackBar } from '@angular/material';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FranchiseeBillingActionTypes, BillSetupsListLoadAction, BillSetupsListLoadSuccessAction, BillSetupsListLoadFailureAction, AddSetupLoadAction, AddSetupLoadSuccessAction, AddSetupLoadFailureAction, AddSetupAction, AddSetupFailureAction, AddSetupSuccessAction, GetFranchiseePaymentsLoadAction, GetFranchiseePaymentsLoadFailureAction, GetFranchiseePaymentsLoadSuccessAction, FranchiseePaymentsFilterAction, FranchiseePaymentsFilterFailureAction, FranchiseePaymentsFilterSuccessAction, ViewFranchiseePaymentsDetailAction, ViewFranchiseePaymentsDetailFailureAction, ViewFranchiseePaymentsDetailSuccessAction, FranchiseePaymentAcknowledgeAction, FranchiseePaymentAcknowledgeFailureAction, FranchiseePaymentAcknowledgeSuccessAction, AddPenaltyAction, AddPenaltySuccessAction, AddPenaltyFailureAction } from '../actions/franchisee_billing.action';
import { FranchiseeBillingService } from 'src/app/service/franchisee-billing/franchisee-billing.service';
import { RegionService } from 'src/app/service/region/region.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RentalPointService } from 'src/app/service/rental-point/rental-point.service';

@Injectable()
export class FranchiseeBillingEffects {
    constructor( private franchiseeBillingService: FranchiseeBillingService ,private actions$: Actions, private _snackBar: MatSnackBar, public router: Router,
        private regionService: RegionService, private domainService: DomainService, private rentalPointService: RentalPointService) {}

    //Frachisee Set ups List Load
    franchiseeSetupsListLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Bill_Setups_List_Load_Action),
            mergeMap((action: BillSetupsListLoadAction) => 
                this.franchiseeBillingService.GetBillsSetups().pipe(
                    map((response) => {
                        console.log(response);
                        return new BillSetupsListLoadSuccessAction(response);
                    }),
                    catchError(error => of(new BillSetupsListLoadFailureAction({
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

    //add franchisee bills set up
    addSetupLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Add_Setup_Load_Action),
            mergeMap((action: AddSetupLoadAction) => 
                this.franchiseeBillingService.AddSetupLoad().pipe(
                    map((response) => {
                        console.log(response);
                        return new AddSetupLoadSuccessAction(response);
                    }),
                    catchError(error => of(new AddSetupLoadFailureAction({
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

    //Add Setup
    addSetup$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Add_Setup_Action),
            mergeMap((action: AddSetupAction) =>
                this.franchiseeBillingService.AddSetup(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new AddSetupFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Successfully Added", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            this.router.navigate(['franchisee-billing', 'bills-setup']);
                            return new AddSetupSuccessAction();
                        }
                    }),
                    catchError(error => of(new AddSetupFailureAction({
                        Info: [],
                        Warnings: [],
                        Business_Errors: [],
                        System_Errors: [{
                            Code: "SE001"
                        }]
                    })))
                )
            )
        )
    );

    //Get Franchisee payments
    getFranchiseePayments$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Action),
            mergeMap((action: GetFranchiseePaymentsLoadAction) => 
            forkJoin([
                this.franchiseeBillingService.FilterFranchiseePayments(action.payload),
                this.regionService.getCities(),
                this.regionService.GetStates(),
                this.rentalPointService.GetCountries(),
                this.franchiseeBillingService.GetBillsSetups(),
                this.domainService.GetFranchiseeBillingStatus()
            ]).pipe(
                map((response) => {
                    console.log(response);
                    if(!!(<ErrorModel>response[0].Errors)) {
                        return new GetFranchiseePaymentsLoadFailureAction(response[0].Errors);
                    } else {
                        return new GetFranchiseePaymentsLoadSuccessAction(response);
                    }
                }),
                    catchError(error => of(new GetFranchiseePaymentsLoadFailureAction({
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

    //Get filtered Payments
    getFilteredPayments$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Action),
            mergeMap((action: FranchiseePaymentsFilterAction) => 
                this.franchiseeBillingService.FilterFranchiseePayments(action.paylaod).pipe(
                    map((response) => {
                        if(!!(<ErrorModel>response.Errors)) {
                            return new FranchiseePaymentsFilterFailureAction(response.Errors);
                        } else {
                            return new FranchiseePaymentsFilterSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new FranchiseePaymentsFilterFailureAction({
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

    //View payment Details
    viewPaymentDetail$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Action),
            mergeMap((action: ViewFranchiseePaymentsDetailAction) => 
                this.franchiseeBillingService.ViewFranchiseePaymentDetails(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new ViewFranchiseePaymentsDetailFailureAction(response.Errors);
                        } else {
                            return new ViewFranchiseePaymentsDetailSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new ViewFranchiseePaymentsDetailFailureAction({
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

    //Add penalty
    addPenalty$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Add_Penalty_Action),
            mergeMap((action: AddPenaltyAction) => 
                this.franchiseeBillingService.AddPenalty(action.paylaod).pipe(
                    map((response) => {
                        console.log(response);
                        if(!!(<ErrorModel>response.Errors)) {
                            return new AddPenaltyFailureAction(response.Errors);
                        } else {
                            const snackbar = this._snackBar.open("Penalty added Successfully", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            return new AddPenaltySuccessAction();
                        }
                    }),
                    catchError(error => of(new AddPenaltyFailureAction({
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

    //Franchisee Payment Acknowledge
    franchiseePaymentAcknowledge$ = createEffect(() => this.actions$
        .pipe(
            ofType(FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Action),
            mergeMap((action: FranchiseePaymentAcknowledgeAction) => 
                this.franchiseeBillingService.FranchiseePayment(action.payload).pipe(
                    map((response) =>{
                        if(!!(<ErrorModel>response.Errors)) {
                            return new FranchiseePaymentAcknowledgeFailureAction(response.Errors);
                        } else {
                            return new FranchiseePaymentAcknowledgeSuccessAction();
                        }
                    }),
                    catchError(error => of(new FranchiseePaymentAcknowledgeFailureAction({
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