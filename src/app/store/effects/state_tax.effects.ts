import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { StateTaxService } from 'src/app/service/state-tax/state-tax.service';
import { StateTaxActionTypes, StateTaxLoadAction, StateTaxLoadSuccessAction, StateTaxLoadFailureAction, StateTaxCreateLoadAction, StateTaxCreateLoadSuccessAction, StateTaxCreateLoadFailureAction, StateTaxCreateAction, StateTaxCreateSuccessAction, StateTaxCreateFailureAction, StateTaxUpdateLoadAction, StateTaxUpdateLoadFailureAction, StateTaxUpdateLoadSuccessAction, StateTaxUpdateAction, StateTaxUpdateFailureAction, StateTaxUpdateSuccessAction, StateTaxDeleteAction, StateTaxDeleteSuccessAction, StateTaxDeleteFailureAction } from '../actions/state_tax.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DomainService } from 'src/app/service/domain/domain.service';
import { RegionService } from 'src/app/service/region/region.service';
import { ErrorModel } from 'src/app/models/errorModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Injectable()
export class StateTaxEffects {
    constructor(private actions$: Actions, private router: Router, private stateTaxService: StateTaxService,
        private domainService: DomainService, private regionService: RegionService, private store: Store<AppState>) { }
    
    getAllStateTaxes$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Load),
            mergeMap((action: StateTaxLoadAction) =>
                this.stateTaxService.getAllStateTaxes().pipe(
                    map(response => {
                        return new StateTaxLoadSuccessAction(response);
                    }),
                    catchError(error => {
                        return of(new StateTaxLoadFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )

    stateTaxCreateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Create_Load),
            mergeMap((action: StateTaxCreateLoadAction) =>
                forkJoin([
                    this.regionService.GetStates(),
                    this.domainService.GetTaxType()
                ]).pipe(
                    map(response => {
                        if(<ErrorModel>response[1].Errors) {
                            return new StateTaxCreateLoadFailureAction(response[1].Errors);
                        }
                        else {
                            return new StateTaxCreateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => {
                        return of(new StateTaxCreateLoadFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )

    stateTaxCreate$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Create),
            exhaustMap((action: StateTaxCreateAction) =>
                this.stateTaxService.createStateTax(action.payload).pipe(
                    map(response => {
                        if(<ErrorModel>response.Errors) {
                            return new StateTaxCreateFailureAction(response.Errors);
                        }
                        else {
                            this.store.dispatch(new StateTaxLoadAction());
                            return new StateTaxCreateSuccessAction();
                        }
                    }),
                    catchError(error => {
                        return of(new StateTaxCreateFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )

    stateTaxUpdateLoad$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Update_Load),
            mergeMap((action: StateTaxUpdateLoadAction) =>
                forkJoin([
                    this.regionService.GetStates(),
                    this.domainService.GetTaxType(),
                    this.stateTaxService.getSingleStateTax(action.payload)
                ]).pipe(
                    map(response => {
                        if(<ErrorModel>response[1].Errors) {
                            return new StateTaxUpdateLoadFailureAction(response[1].Errors);
                        }
                        else if(<ErrorModel>response[2].Errors) {
                            return new StateTaxUpdateLoadFailureAction(response[2].Errors);
                        }
                        else {
                            return new StateTaxUpdateLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => {
                        return of(new StateTaxUpdateLoadFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )

    stateTaxUpdate$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Update),
            exhaustMap((action: StateTaxUpdateAction) =>
                this.stateTaxService.updateStateTax(action.payload).pipe(
                    map(response => {
                        if(<ErrorModel>response.Errors) {
                            return new StateTaxUpdateFailureAction(response.Errors);
                        }
                        else {
                            this.store.dispatch(new StateTaxLoadAction());
                            return new StateTaxUpdateSuccessAction();
                        }
                    }),
                    catchError(error => {
                        return of(new StateTaxUpdateFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )

    stateTaxDelete$ = createEffect(() => this.actions$
        .pipe(
            ofType(StateTaxActionTypes.State_Tax_Delete),
            exhaustMap((action: StateTaxDeleteAction) =>
                this.stateTaxService.deleteStateTax(action.payload).pipe(
                    map((response) => {
                        if(<ErrorModel>response.Errors) {
                            return new StateTaxDeleteFailureAction(response.Errors);
                        }
                        else {
                            this.store.dispatch(new StateTaxLoadAction());
                            return new StateTaxDeleteSuccessAction();
                        }
                    }),
                    catchError(error => {
                        return of(new StateTaxDeleteFailureAction({
                            Info: [],
                            Business_Errors: [],
                            Warnings: [],
                            System_Errors: [{
                                Code: "SE001"
                            }]
                        }))
                    })
                )
            )
        )
    )
}