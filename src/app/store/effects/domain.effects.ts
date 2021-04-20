import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { DomainService } from 'src/app/service/domain/domain.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BatteryStatusLoadAction, BatteryStatusLoadSuccessAction, BatteryStatusLoadFailureAction, DomainActionTypes, ErrorFrameworkLoadAction, ErrorFrameworkLoadSuccessAction, ErrorFrameworkLoadFailureAction, } from '../actions/domain.action';

@Injectable() 
export class DomainEffects {
    constructor(private actions$: Actions, private domainService: DomainService) { }
  

    errorFramework$ = createEffect(() => this.actions$
        .pipe(
            ofType(DomainActionTypes.Error_Framework_Load),
            mergeMap(() => 
                this.domainService.GetErrorFramework().pipe(
                    map((response) => {
                        console.log(response);
                        return new ErrorFrameworkLoadSuccessAction(response);
                    }),
                    catchError(() => of(new ErrorFrameworkLoadFailureAction({
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