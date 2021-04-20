import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';

export enum FranchisePricingActionTypes {
    Franchise_Pricing_Load = "[FRANCHISE] Franchise Pricing Load",
    Franchise_Pricing_Load_Success = "[FRANCHISE] Franchise Pricing Load Success",
    Franchise_Pricing_Load_Failure = "[FRANCHISE] Franchise Pricing Load Failure"
}

export class FranchisePricingLoadAction implements Action {
    readonly type = FranchisePricingActionTypes.Franchise_Pricing_Load;
}

export class FranchisePricingLoadSuccessAction implements Action {
    readonly type = FranchisePricingActionTypes.Franchise_Pricing_Load_Success;
    constructor(public payload: any) {
        
    }
}

export class FranchisePricingLoadFailureAction implements Action {
    readonly type = FranchisePricingActionTypes.Franchise_Pricing_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

export type FranchisePricingActions = FranchisePricingLoadAction
| FranchisePricingLoadSuccessAction
| FranchisePricingLoadFailureAction
