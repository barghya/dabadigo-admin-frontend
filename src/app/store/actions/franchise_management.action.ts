import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { GetRp, getRentalpoint, RpId } from 'src/app/models/franchiseRentalPointModel';


export enum FranchiseManagementAction {
    Franchise_Rental_Point_Load = "[FRANCHISE] Franchise Rental Point Load",
    Franchise_Rental_Point_Load_Success = "[FRANCHISE] Franchise_Rental_Point_Load_Success",
    Franchise_Rental_Point_Load_Failure = "[FRANCHISE] Franchise_Rental_Point_Load_Failure",
    Get_Franchise_Rental_Point_History = "[FRANCHISE] Get_Franchise_Rental_Point_History",
    Get_Franchise_Rental_Point_History_Success = "[FRANCHISE] Get_Franchise_Rental_Point_History_Success",
    Get_Franchise_Rental_Point_History_Failure = "[FRANCHISE] Get_Franchise_Rental_Point_History_Failure"
}

//FranchiseRental Point Load
export class FranchiseRentalPointLoadAction implements Action {
    readonly type = FranchiseManagementAction.Franchise_Rental_Point_Load;
    constructor(public payload: number ) {}
}

export class FranchiseRentalPointLoadSuccessAction implements Action {
    readonly type = FranchiseManagementAction.Franchise_Rental_Point_Load_Success;

    constructor(public payload: GetRp[]){}
}

export class FranchiseRentalPointLoadFailureAction implements Action {
    readonly type = FranchiseManagementAction.Franchise_Rental_Point_Load_Failure;

    constructor(public payload: ErrorModel) {}
}

// Get Rental Point
export class GetFranchiseRentalPointHistoryAction implements Action {
    readonly type = FranchiseManagementAction.Get_Franchise_Rental_Point_History;
    constructor(public payload: RpId) {}
}

export class GetFranchiseRentalPointHistorySuccessAction implements Action {
    readonly type = FranchiseManagementAction.Get_Franchise_Rental_Point_History_Success;
    constructor(public payload: any[]) {}
}

export class GetFranchiseRentalPointHistoryFailureAction implements Action {
    readonly type = FranchiseManagementAction.Get_Franchise_Rental_Point_History_Failure;
    constructor(public payload: ErrorModel) {}
}


export type FranchiseRentalPoints = FranchiseRentalPointLoadAction
| FranchiseRentalPointLoadSuccessAction
| FranchiseRentalPointLoadFailureAction
| GetFranchiseRentalPointHistoryAction
| GetFranchiseRentalPointHistorySuccessAction
| GetFranchiseRentalPointHistoryFailureAction