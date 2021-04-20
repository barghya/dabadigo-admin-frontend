import { DomainData } from 'src/app/models/domainModel';
import { Action } from '@ngrx/store';
import { ErrorModel, error_repo } from 'src/app/models/errorModel';
import { DeviceLoadAction } from './asset_inventory.action';

export enum DomainActionTypes {
    Battery_Status_Load = "[DOMAIN] Battery Status load",
    Battery_Status_Load_Success = "[DOMAIN] Battery Status Load Success",
    Battery_Status_Load_Failure = "[DOMAIN] Battery Status Load Failure",

    Error_Framework_Load = "[DOMAIN] Error Framework Load",
    Error_Framework_Load_Success = "[DOMAIN] Error Framework Load Success",
    Error_Framework_Load_Failure = "[DOMAIN] Error Framework Load Failure",
}

//Battery Status Load
export class BatteryStatusLoadAction implements Action {
    readonly type = DomainActionTypes.Battery_Status_Load;
    constructor() { }
}

export class BatteryStatusLoadSuccessAction implements Action {
    readonly type = DomainActionTypes.Battery_Status_Load_Success;

    constructor (public payload: DomainData[]) { }
}

export class BatteryStatusLoadFailureAction implements Action {
    readonly type = DomainActionTypes.Battery_Status_Load_Failure;

    constructor (public payload: ErrorModel) { }
}

export class ErrorFrameworkLoadAction implements Action {
    readonly type = DomainActionTypes.Error_Framework_Load;
}


export class ErrorFrameworkLoadSuccessAction implements Action {
    readonly type = DomainActionTypes.Error_Framework_Load_Success;

    constructor(public payload: error_repo[]) { }
}

export class ErrorFrameworkLoadFailureAction implements Action {
    readonly type = DomainActionTypes.Error_Framework_Load_Failure;

    constructor (public payload: ErrorModel) { }
}

export type DomainAction = BatteryStatusLoadAction
| BatteryStatusLoadSuccessAction
| BatteryStatusLoadFailureAction
| ErrorFrameworkLoadAction
| ErrorFrameworkLoadSuccessAction
| ErrorFrameworkLoadFailureAction