import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { StateTaxItem } from 'src/app/models/stateTaxModel';

export enum StateTaxActionTypes {
    State_Tax_Load = "[STATE_TAX] State Tax Load",
    State_Tax_Load_Success = "[STATE_TAX] State Tax Load Success",
    State_Tax_Load_Failure = "[STATE_TAX] State Tax Load Failure",

    State_Tax_Create_Load = "[STATE_TAX] State Tax Create Load",
    State_Tax_Create_Load_Success = "[STATE_TAX] State Tax Create Load Success",
    State_Tax_Create_Load_Failure = "[STATE_TAX] State Tax Create Load Failure",

    State_Tax_Create = "[STATE_TAX] State Tax Create",
    State_Tax_Create_Success = "[STATE_TAX] State Tax Create Success",
    State_Tax_Create_Failure = "[STATE_TAX] State Tax Create Failure",

    State_Tax_Update_Load = "[STATE_TAX] State Tax Update Load",
    State_Tax_Update_Load_Success = "[STATE_TAX] State Tax Update Load Success",
    State_Tax_Update_Load_Failure = "[STATE_TAX] State Tax Update Load Failure",

    State_Tax_Update = "[STATE_TAX] State Tax Update",
    State_Tax_Update_Success = "[STATE_TAX] State Tax Update Success",
    State_Tax_Update_Failure = "[STATE_TAX] State Tax Update Failure",

    State_Tax_Delete = "[STATE_TAX] State Tax Delete",
    State_Tax_Delete_Success = "[STATE_TAX] State Tax Delete Success",
    State_Tax_Delete_Failure = "[STATE_TAX] State Tax Delete Failure",
}

//State Tax Load
export class StateTaxLoadAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Load;
}

export class StateTaxLoadSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Load_Success;
    
    constructor(public payload: StateTaxItem[]){}
}

export class StateTaxLoadFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Load_Failure;

    constructor(public payload: ErrorModel){}
}

//State Tax Create Load
export class StateTaxCreateLoadAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create_Load;
}

export class StateTaxCreateLoadSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create_Load_Success;
    
    constructor(public payload: any){}
}

export class StateTaxCreateLoadFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create_Load_Failure;

    constructor(public payload: ErrorModel){}
}

//State Tax Create
export class StateTaxCreateAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create;

    constructor(public payload: StateTaxItem){}
}

export class StateTaxCreateSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create_Success;
}

export class StateTaxCreateFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Create_Failure;

    constructor(public payload: ErrorModel){}
}

//State Tax Update Load
export class StateTaxUpdateLoadAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update_Load;

    constructor(public payload: number){}
}

export class StateTaxUpdateLoadSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update_Load_Success;
    
    constructor(public payload: any){}
}

export class StateTaxUpdateLoadFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update_Load_Failure;

    constructor(public payload: ErrorModel){}
}

//State Tax Update
export class StateTaxUpdateAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update;

    constructor(public payload: StateTaxItem){}
}

export class StateTaxUpdateSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update_Success;
}

export class StateTaxUpdateFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Update_Failure;

    constructor(public payload: ErrorModel){}
}

//State Tax Delete
export class StateTaxDeleteAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Delete;

    constructor(public payload: number){}
}

export class StateTaxDeleteSuccessAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Delete_Success;
}

export class StateTaxDeleteFailureAction implements Action {
    readonly type = StateTaxActionTypes.State_Tax_Delete_Failure;

    constructor(public payload: ErrorModel){}
}

export type StateTaxActions = StateTaxLoadAction
| StateTaxLoadFailureAction
| StateTaxLoadSuccessAction
| StateTaxCreateLoadAction
| StateTaxCreateLoadFailureAction
| StateTaxCreateLoadSuccessAction
| StateTaxCreateAction
| StateTaxCreateFailureAction
| StateTaxCreateSuccessAction
| StateTaxUpdateLoadAction
| StateTaxUpdateLoadFailureAction
| StateTaxUpdateLoadSuccessAction
| StateTaxUpdateAction
| StateTaxUpdateFailureAction
| StateTaxUpdateSuccessAction
| StateTaxDeleteAction
| StateTaxDeleteFailureAction
| StateTaxDeleteSuccessAction