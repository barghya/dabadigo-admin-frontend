import { Action } from '@ngrx/store';
import { CorporateManagement, AdmnPartnerId } from 'src/app/models/corporateManagement';
import { ErrorModel } from 'src/app/models/errorModel';

export enum CorporateManagementAction {
    Corporate_Management_Load = "[CORPORATEMANAGEMENT] Corporate Management Load",
    Corporate_Management_Load_Success = "[CORPORATEMANAGEMENT] Corporate Management Load Success",
    Corporate_Management_Load_Failure = "[CORPORATEMANAGEMENT] Corporate Management Load Failure",

    Add_Corporate_Management_Load_Action = "[CORPORATEMANAGEMENT] Corporate Management Load",
    Add_Corporate_Management_Load_Success_Action = "[CORPORATEMANAGEMENT]  Corporate Management Load Success",
    Add_Corporate_Management_Load_Failure_Action = "[CORPORATEMANAGEMENT] Corporate Management Load Failure",

    Edit_Corporate_Load = "[CORPORATEMANAGEMENT] Edit Corporate Load",
    Edit_Corporate_Load_Success = "[CORPORATEMANAGEMENT] Edit Corporate Load Success",
    Edit_Corporate_Load_Failure = "[CORPORATEMANAGEMENT] Edit Corporate Load Failure",

    Edit_Corporate = "[CORPORATEMANAGEMENT] Edit Corporate",
    Edit_Corporate_Success = "[CORPORATEMANAGEMENT] Edit Corporate Success",
    Edit_Corporate_Failure = "[CORPORATEMANAGEMENT] Edit Corporate Failure",

    Add_Corporate_Management_Action = "[CORPORATEMANAGEMENT] Corporate Management Create",
    Add_Corporate_Management_Success_Action = "[CORPORATEMANAGEMENT] Corporate Management Create Success",
    Add_Corporate_Management_Failure_Action = "[CORPORATEMANAGEMENT] Corporate Management Create Failure",

    Add_Another_Corporate_Management_Action = "[CORPORATEMANAGEMENT] Another Corporate Management Create",
}
//Corporate List Load
export class CorporateManagementLoadAction implements Action {
    readonly type = CorporateManagementAction.Corporate_Management_Load;
}

export class CorporateManagementLoadSuccessAction implements Action {
    readonly type = CorporateManagementAction.Corporate_Management_Load_Success;
    constructor(public payload: CorporateManagement[]) {}
}

export class CorporateManagementLoadFailureAction implements Action {
    readonly type = CorporateManagementAction.Corporate_Management_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Corporate Add Drop Down
export class AddCorporateLoadAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Load_Action;
}
export class AddCorporateLoadSuccessAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Load_Success_Action;
    constructor(public payload:any[]){}
}
export class AddCorporateLoadFailureAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Load_Failure_Action;
    constructor(public payload: ErrorModel){}
}

// Edit corporate Load

export class EditCorporateLoadAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate_Load;
    constructor(public payload: AdmnPartnerId) {}
}

export class EditCorporateLoadSuccessAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate_Load_Success;
    constructor(public payload: any[]) {}
}

export class EditCorporateLoadFailureAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

// Edit Corporate

export class EditCorporateAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate;
    constructor(public payload: CorporateManagement) {}
}

export class EditCorporateSuccessAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate_Success;
}

export class EditCorporateFailureAction implements Action {
    readonly type = CorporateManagementAction.Edit_Corporate_Failure;
    constructor(public payload: ErrorModel) {}
}

//Add Corporate 
export class AddCorporateAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Action;
    constructor(public payload:CorporateManagement){}
}
export class AddCorporateSuccessAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Success_Action
}
export class AddCorporateFailureAction implements Action {
    readonly type = CorporateManagementAction.Add_Corporate_Management_Failure_Action
    constructor(public payload: ErrorModel){}
}

//Add Another Corporate
export class AddAnotherCorporateAction implements Action {
    readonly type = CorporateManagementAction.Add_Another_Corporate_Management_Action;

    constructor(public payload:CorporateManagement){}
}
export type CorporationManagements = CorporateManagementLoadAction
| CorporateManagementLoadSuccessAction
| CorporateManagementLoadFailureAction
| AddCorporateLoadAction
| AddCorporateLoadSuccessAction
| AddCorporateLoadFailureAction
| EditCorporateLoadAction
| EditCorporateLoadSuccessAction
| EditCorporateLoadFailureAction
| EditCorporateAction
| EditCorporateSuccessAction
| EditCorporateFailureAction
| AddCorporateAction
| AddCorporateSuccessAction
| AddCorporateFailureAction
| AddAnotherCorporateAction
