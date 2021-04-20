import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';

export enum DashboardActionTypes {
    Dashboard_Load = "[DASHBOARD] Dashboard Load Action",
    Dashboard_Load_Success = "[DASHBOARD] Dashboard Load Action Success",
    Dashboard_Load_Failure = "[DASHBOARD] Dashboard Load Action Failure",
}

export class DashboardLoadAction implements Action {
    readonly type = DashboardActionTypes.Dashboard_Load;
    constructor(public payload: number) { }
}

export class DashboardLoadSuccessAction implements Action {
    readonly type = DashboardActionTypes.Dashboard_Load_Success;
    constructor(public payload: any) { }
}

export class DashboardLoadFailureAction implements Action {
    readonly type = DashboardActionTypes.Dashboard_Load_Failure;
    constructor(public payload: ErrorModel) { }
}

export type DashboardActions = DashboardLoadAction
| DashboardLoadSuccessAction
| DashboardLoadFailureAction