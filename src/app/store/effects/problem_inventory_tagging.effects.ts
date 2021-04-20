import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProblemInventoryTaggingService } from 'src/app/service/problem-inventory-tagging/problem-inventory-tagging.service';
import { ProblemInventoryTaggingActionTypes, GetProblemLoadAction, GetProblemLoadFailureAction, GetProblemLoadSuccessAction, ProblemInventoryTaggingLoadAction, ProblemInventoryTaggingLoadSuccessAction, ProblemInventoryTaggingLoadFailureAction, UpdateProblemInventoryTaggingAction, UpdateProblemInventoryTaggingFailureAction, UpdateProblemInventoryTaggingSuccessAction } from '../actions/problem_inventory_tagging.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ErrorModel } from 'src/app/models/errorModel';
import { of, forkJoin } from 'rxjs';
import { AssetInventoryService } from 'src/app/service/asset-inventory/asset-inventory.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProblemInventoryTaggingEffects {
    constructor( private actions$: Actions, private store: Store<AppState>, private problemInventoryTaggingService: ProblemInventoryTaggingService, private assetInventoryService: AssetInventoryService, private _snackBar: MatSnackBar ) {}

    //Get All Problems/ Problem Inventory tagging Load Action
    problemInventoryTaggingload$ = createEffect(() => this.actions$
        .pipe(
            ofType(ProblemInventoryTaggingActionTypes.Problem_Inventory_Tagging_Load_Action),
            mergeMap((action: ProblemInventoryTaggingLoadAction) => 
                forkJoin([
                    this.problemInventoryTaggingService.getAllproblems(),
                    this.assetInventoryService.getPartsMasterList()
                ]).pipe(
                    map((response) => {
                        console.log(response);
                        return new ProblemInventoryTaggingLoadSuccessAction(response);
                    }),
                    catchError(error => of(new ProblemInventoryTaggingLoadFailureAction({
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
    )

    //Get Problem By code
    getProblem$ = createEffect(() => this.actions$
        .pipe(
            ofType(ProblemInventoryTaggingActionTypes.Get_Problem_Load_Action),
            mergeMap((action: GetProblemLoadAction) => 
                this.problemInventoryTaggingService.getProblembyCode(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response.Errors) {
                            return new GetProblemLoadFailureAction(response.Errors);
                        }
                        else {
                            return new GetProblemLoadSuccessAction(response);
                        }
                    }),
                    catchError(error => of(new GetProblemLoadFailureAction({
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

    //Update Problem inventory tagging
    updateProblemInventoryTagging$ = createEffect(() => this.actions$
        .pipe(
            ofType(ProblemInventoryTaggingActionTypes.Update_Problem_InventoryTagging_Action),
            mergeMap((action: UpdateProblemInventoryTaggingAction) => 
                this.problemInventoryTaggingService.updateProblemInventoryTagging(action.payload).pipe(
                    map((response) => {
                        console.log(response);
                        if(<ErrorModel>response.Errors) {
                            return new UpdateProblemInventoryTaggingFailureAction(response.Errors);
                        }
                        else{
                            this.store.dispatch(new GetProblemLoadAction({
                                problem_code: action.payload.problem_code
                            }));
                            const snackbar = this._snackBar.open("Part has been tagged succesfuly", "DISMISS", {
                                panelClass: ["success-snackbar"],
                                duration: 3000
                            });
                            return new UpdateProblemInventoryTaggingSuccessAction();
                        }
                    }),
                    catchError(error => of(new UpdateProblemInventoryTaggingFailureAction({
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
    )
}