import { Action } from '@ngrx/store';
import { GetTermsandConditions, AddTandC } from 'src/app/models/termsandconditionsModel';
import { ErrorModel } from 'src/app/models/errorModel';

export enum TermsandConditionsActionTypes {
    //Get terms and Conditions
    Get_Terms_and_Conditions_Action = "[TERMSANDCONDITIONS] Get Terms and Conditions Action",
    Get_Terms_and_Conditions_Succes_Action = "[TERMSANDCONDITIONS] Get Terms and Conditions Success Action",
    Get_Terms_and_Conditions_Failure_Action = "[TERMSANDCONDITIONS] Get Terms and Conditions Failure Action",
    //add Terms and conditions
    Add_Terms_and_Conditions_Action = "[TERMSANDCONDITIONS] Add Terms and Conditions Action",
    Add_Terms_and_Conditions_Success_Action = "[TERMSANDCONDITIONS] Add Terms and Conditions Success Action",
    Add_Terms_and_Conditions_Failure_Action = "[TERMSANDCONDITIONS] Add Terms and Conditions Failure Action",
    //Edit Terms and condition load
    Edit_Terms_and_Conditions_Load_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Load Action",
    Edit_Terms_and_Conditions_Load_Success_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Load Success Action",
    Edit_Terms_and_Conditions_Load_Failure_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Load Failure Action",
    //Edit terms and Conditions
    Edit_Terms_and_Conditions_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Action",
    Edit_Terms_and_Conditions_Success_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Success Action",
    Edit_Terms_and_Conditions_Failure_Action = "[TERMSANDCONDITIONS] Edit Terms and Conditions Failure Action",
}

// Get terms and Conditions
export class GetTermsAndConditionsAction implements Action {
    readonly type = TermsandConditionsActionTypes.Get_Terms_and_Conditions_Action;
}

export class GetTermsAndConditionsSuccessAction implements Action {
    readonly type = TermsandConditionsActionTypes.Get_Terms_and_Conditions_Succes_Action;
    constructor(public payload: GetTermsandConditions[]) {}
}

export class GetTermsAndConditionsFailureAction implements Action {
    readonly type = TermsandConditionsActionTypes.Get_Terms_and_Conditions_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Add terms and Conditions
export class AddTermsandConditionsAction implements Action {
    readonly type = TermsandConditionsActionTypes.Add_Terms_and_Conditions_Action;
    constructor(public payload: AddTandC) {}
}

export class AddTermsandConditionsSuccessAction implements Action {
    readonly type = TermsandConditionsActionTypes.Add_Terms_and_Conditions_Success_Action;
}

export class AddTermsandConditionsFailureAction implements Action {
    readonly type = TermsandConditionsActionTypes.Add_Terms_and_Conditions_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Edit TErms and Conditions load
export class EditTermsandConditionsLoadAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Action;
    constructor(public payload: number) {}
}

export class EditTermsandConditionsLoadSuccessAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Success_Action;
    constructor(public payload: GetTermsandConditions) {}
}

export class EditTermsandConditionsLoadFailureAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Load_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Edit terms and conditions
export class EditTermsandConditionsAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Action;
    constructor(public payload: GetTermsandConditions) {}
}

export class EditTermsandConditionsSuccessAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Success_Action;
}

export class EditTermsandConditionsFailureAction implements Action {
    readonly type = TermsandConditionsActionTypes.Edit_Terms_and_Conditions_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

export type TermsandConditionsAction = GetTermsAndConditionsAction
| GetTermsAndConditionsSuccessAction
| GetTermsAndConditionsFailureAction
| AddTermsandConditionsAction
| AddTermsandConditionsSuccessAction
| AddTermsandConditionsFailureAction
| EditTermsandConditionsLoadAction
| EditTermsandConditionsLoadSuccessAction
| EditTermsandConditionsLoadFailureAction
| EditTermsandConditionsAction
| EditTermsandConditionsSuccessAction
| EditTermsandConditionsFailureAction