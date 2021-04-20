import { Action } from '@ngrx/store';
import { corporateCodeList, corporateCodeID } from 'src/app/models/corporateCodeManagementModel';
import { ErrorModel } from 'src/app/models/errorModel';

export enum CorporateCodeManagementActionTypes {
    //Code list load
    Code_List_Load = "[CODE] Code List Load",
    Code_List_Load_Success = "[CODE] Code List Load Success",
    Code_List_Load_Failure = "[CODE] Code List Load Failure",
    //Create Code Action
    Create_Code_Load_Action = "[CODE] Create Code Load Action",
    Create_Code_Load_Success_Action = "[CODE] Create Code Load Success Action",
    Create_Code_Load_Failure_Action = "[CODE] Create Code Load Failure Action",
    //Create Code Load Action 
    Create_Code_Action = "[CODE] Create Code Action",
    Create_Code_Success_Action = "[CODE] Create Code Success Action",
    Create_Code_Failure_Action = "[CODE] Create Code Failure Action",
    //Add another Corporate Code
    Create_Another_Corporate_Code = "[CODE] Create Another Corporate Code",
    //Update Code Load Action
    Update_Code_Load_Action = "[CODE] Update Code Load Action",
    Update_Code_Load_Success_Action = "[CODE] Update Code Load Success Action",
    Update_Code_Load_Failure_Action = "[CODE] Update Code Load Failure Action",
    //Update Code action 
    Update_Code_Action = "[CODE] Update Code Action",
    Update_Code_Success_Action = "[CODE] Update Code Success Action",
    Update_Code_Failure_Action = "[CODE] Update Code Failure Action",
    //Delete Code Action
    Delete_Code_Action = "[CODE] Delete Code Action",
    Delete_Code_Failure_Action = "[CODE] Delete Code Failure Action",
}

//Code List Load Action
export class CodeListLoadAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Code_List_Load;
}

export class CodeListLoadSuccessAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Code_List_Load_Success;

    constructor( public payload: corporateCodeList[] ) { }
}

export class CodeListLoadFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Code_List_Load_Failure;

    constructor(public payload: ErrorModel) { }
}

//Create Code Load Action
export class CreateCodeLoadAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Load_Action;
}

export class CreateCodeLoadSuccessAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Load_Success_Action;

    constructor(public payload: any[]) {}
}

export class CreateCodeLoadFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Load_Failure_Action;
    
    constructor(public payload: ErrorModel) {}
}

//Create Code Action
export class CreateCodeAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Action;

    constructor(public payload: corporateCodeList) {}
}

export class CreateCodeSuccessAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Success_Action;

    constructor(public payload: corporateCodeList[] ) {}
}

export class CreateCodeFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Code_Failure_Action;

    constructor(public payload: ErrorModel) {}
}

//Add another Corporate Code
export class CreateAnotherCorporateCode implements Action {
    readonly type = CorporateCodeManagementActionTypes.Create_Another_Corporate_Code;

    constructor(public payload: corporateCodeList) { }
}


//Update Code Load Action
export class UpdateCodeLoadAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Load_Action;

    constructor(public payload: corporateCodeID) { }
}

export class UpdateCodeLoadSuccessAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Load_Success_Action;

    constructor(public payload: any[]) { }
}

export class UpdateCodeLoadFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Load_Failure_Action;
    
    constructor(public payload: ErrorModel) {}
}

//Update Code Action
export class UpdateCodeAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Action;

    constructor(public payload: corporateCodeList) {}
}

export class UpdateCodeSuccessAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Success_Action;
}

export class UpdateCodeFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Update_Code_Failure_Action;

    constructor(public payload: ErrorModel) {}
}

//Delete Actions
export class DeleteCodeAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Delete_Code_Action;

    constructor(public payload: corporateCodeID) { }
}

export class DeleteCodeFailureAction implements Action {
    readonly type = CorporateCodeManagementActionTypes.Delete_Code_Failure_Action;

    constructor(public payload: ErrorModel) {}
}


export type CorporateCodeManagementAction = CodeListLoadAction
| CodeListLoadSuccessAction
| CodeListLoadFailureAction
| CreateCodeAction
| CreateCodeSuccessAction
| CreateCodeFailureAction
| CreateCodeLoadAction
| CreateCodeLoadSuccessAction
| CreateCodeLoadFailureAction
| UpdateCodeAction
| UpdateCodeSuccessAction
| UpdateCodeFailureAction
| UpdateCodeLoadAction
| UpdateCodeLoadSuccessAction
| UpdateCodeLoadFailureAction
| DeleteCodeAction
| DeleteCodeFailureAction 
| CreateAnotherCorporateCode


