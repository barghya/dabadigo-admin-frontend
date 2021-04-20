import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { FranchiseAssets } from 'src/app/models/franchiseVehicleModel';

export enum FranchiseVehicleAction {
    Franchise_Vehicle_Load = "[FRANCHISE] Franchise Vehicle Load",
    Franchise_Vehicle_Load_Success = "[FRANCHISE] Franchise_Vehicle_Load_Success",
    Franchise_Vehicle_Load_Failure = "[FRANCHISE] Franchise_Vehicle_Load_Failure"
}

//Franchise Vehicle Load
export class FranchiseVehicleLoadAction implements Action {
    readonly type = FranchiseVehicleAction.Franchise_Vehicle_Load;
    constructor(public payload: number ) {}
}

export class FranchiseVehicleLoadSuccessAction implements Action {
    readonly type = FranchiseVehicleAction.Franchise_Vehicle_Load_Success;

    constructor(public payload: FranchiseAssets[]){}
}

export class FranchiseVehicleLoadFailureAction implements Action {
    readonly type = FranchiseVehicleAction.Franchise_Vehicle_Load_Failure;

    constructor(public payload: ErrorModel) {}
}

export type FranchiseVehicles = FranchiseVehicleLoadAction
| FranchiseVehicleLoadSuccessAction
| FranchiseVehicleLoadFailureAction