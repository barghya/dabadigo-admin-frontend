import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { Parameter } from 'src/app/models/parametermanagementModel';

export enum ParameterManagementActionTypes {
    Parameter_Management_Load = "[PARAMETER] Parameter Management Load",
    Parameter_Management_Load_Success = "[PARAMETER] Parameter Management Load Success",
    Parameter_Management_Load_Failure = "[PARAMETER] Parameter Management Load Failure",

    Add_Parameter = "[PARAMETER] Add Parameter",
    Add_Parameter_Success = "[PARAMETER] Add Parameter Success",
    Add_Parameter_Failure = "[PARAMETER] Add Parameter Failure",

    Add_Another_Parameter = "[PARAMETER] Add Another Parameter",

    Edit_Parameter_Load = "[PARAMETER] Edit Parameter Load",
    Edit_Parameter_Load_Success = "[PARAMETER] Edit Parameter Load Success",
    Edit_Parameter_Load_Failure = "[PARAMETER] Edit Parameter Load Failure",

    Edit_Parameter = "[PARAMETER] Edit Parameter",
    Edit_Parameter_Success = "[PARAMETER] Edit Parameter Success",
    Edit_Parameter_Failure = "[PARAMETER] Edit Parameter Failure",
}
// Parameter Management Action
export class ParameterLoadAction implements Action {
    readonly type = ParameterManagementActionTypes.Parameter_Management_Load;
}

export class ParameterLoadSuccessAction implements Action {
    readonly type = ParameterManagementActionTypes.Parameter_Management_Load_Success;
    constructor(public payload: Parameter[]) {}
}

export class ParameterLoadFailureAction implements Action {
    readonly type = ParameterManagementActionTypes.Parameter_Management_Load_Failure;
    constructor(public payload: ErrorModel) {}
}
// Add Parameter
export class AddParameterAction implements Action {
    readonly type = ParameterManagementActionTypes.Add_Parameter;
    constructor(public payload: Parameter) {}
}

export class AddParameterSuccessAction implements Action {
    readonly type = ParameterManagementActionTypes.Add_Parameter_Success;
}

export class AddParameterFailureAction implements Action {
    readonly type = ParameterManagementActionTypes.Add_Parameter_Failure;
    constructor(public payload: ErrorModel) {}
}

// Add another Parameter
export class AddAnotherParameterAction implements Action {
    readonly type = ParameterManagementActionTypes.Add_Another_Parameter;
    constructor(public payload: Parameter) {}
}

// Edit Load  Parameter
export class EditParameterLoadAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter_Load;
    constructor(public payload: Parameter) {}
}

export class EditParameterLoadSuccessAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter_Load_Success;
    constructor(public payload: any[]) {}
}

export class EditParameterLoadFailureAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit parameter
export class EditParameterAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter;
    constructor(public payload: Parameter) {}
}

export class EditParameterSuccessAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter_Success;
}

export class EditParameterFailureAction implements Action {
    readonly type = ParameterManagementActionTypes.Edit_Parameter_Failure;
    constructor(public payload: ErrorModel) {}
}

export type ParameterManagementAction = ParameterLoadAction
| ParameterLoadSuccessAction
| ParameterLoadFailureAction
| AddParameterAction
| AddAnotherParameterAction
| AddParameterSuccessAction
| AddParameterFailureAction
| EditParameterLoadAction
| EditParameterLoadSuccessAction
| EditParameterLoadFailureAction
| EditParameterAction
| EditParameterSuccessAction
| EditParameterFailureAction
