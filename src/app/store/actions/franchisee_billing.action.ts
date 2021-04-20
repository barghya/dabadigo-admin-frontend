import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { FranchiseeSetUps, Franchisees, CreateFranchiseeSetup, FranchiseeBillsFilterPayload, FranchiseePayments, ViewFranchiseePaymentDetails, getPaymentDetails, generatePenaltyService } from 'src/app/models/franchiseeBillingModel';

export enum FranchiseeBillingActionTypes {
    //Get Setups
    Bill_Setups_List_Load_Action = "[FRANCHISEEBILLING] Bill Setups List Load Action",
    Bill_Setups_List_Load_Success_Action = "[FRANCHISEEBILLING] Bill Setups List Load Success Action",
    Bill_Setups_List_Load_Failure_Action = "[FRANCHISEEBILLING] Bill Setups List Load Failure Action",
    //Add Setup load
    Add_Setup_Load_Action = "[FRANCHISEEBILLING] Add Setup List Load Action",
    Add_Setup_Load_Success_Action = "[FRANCHISEEBILLING] Add Setup List Load Success Action",
    Add_Setup_Load_Failure_Action = "[FRANCHISEEBILLING] Add Setup List Load Failure Action",
    //Add Setup
    Add_Setup_Action = "[FRANCHISEEBILLING] Add Setup Action",
    Add_Setup_Success_Action = "[FRANCHISEEBILLING] Add Setup Success Action",
    Add_Setup_Failure_Action = "[FRANCHISEEBILLING] Add Setup Failure Action",
    //Get Franchisee payments
    Get_Franchisee_Payments_Load_Action = "[FRANCHISEEBILLING] Get Franchisee Payments Load Action",
    Get_Franchisee_Payments_Load_Success_Action = "[FRANCHISEEBILLING] Get Franchisee Payments Load Success Action",
    Get_Franchisee_Payments_Load_Failure_Action = "[FRANCHISEEBILLING] Get Franchisee Payments Load Failure Action",
    //Get Franchisee Payments Filter
    Franchisee_Payments_Filter_Action = "[FRANCHISEEBILLING] Franchisee Payments Filter Action",
    Franchisee_Payments_Filter_Success_Action = "[FRANCHISEEBILLING] Franchisee Payments Filter Success Action",
    Franchisee_Payments_Filter_Failure_Action = "[FRANCHISEEBILLING] Franchisee Payments Filter Failure Action",
    //View Franchisee payment Detail Action
    View_Franchisee_Payments_Detail_Action = "[FRANCHISEEBILLING] View Franchisee Payments Detail Action",
    View_Franchisee_Payments_Detail_Success_Action = "[FRANCHISEEBILLING] View Franchisee Payments Detail Success Action",
    View_Franchisee_Payments_Detail_Failure_Action = "[FRANCHISEEBILLING] View Franchisee Payments Detail Failure Action",
    //Add Penalties
    Add_Penalty_Action = "[FRANCHISEEBILLING] Add Penalty Action",
    Add_Penalty_Success_Action = "[FRANCHISEEBILLING] Add Penalty Success Action",
    Add_Penalty_Failure_Action = "[FRANCHISEEBILLING] Add Penalty Failure Action",
    //Franchisee Payment Acknowledge
    Franchisee_Payment_Acknowledge_Action = "[FRANCHISEEBILLING] Franchisee Payment Acknowledge Action",
    Franchisee_Payment_Acknowledge_Success_Action = "[FRANCHISEEBILLING] Franchisee Payment Acknowledge Success Action",
    Franchisee_Payment_Acknowledge_Failure_Action = "[FRANCHISEEBILLING] Franchisee Payment Acknowledge Ffailure Action"
}

//Get Setups
export class BillSetupsListLoadAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Bill_Setups_List_Load_Action;
}

export class BillSetupsListLoadSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Bill_Setups_List_Load_Success_Action;
    constructor(public payload: FranchiseeSetUps[]) {}
}

export class BillSetupsListLoadFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Bill_Setups_List_Load_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Get franchisee's
export class AddSetupLoadAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Load_Action;
}

export class AddSetupLoadSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Load_Success_Action;
    constructor(public payload: Franchisees[]) {}
}

export class AddSetupLoadFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Load_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Add Franchisee
export class AddSetupAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Action;
    constructor(public payload: CreateFranchiseeSetup) {}
}

export class AddSetupSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Success_Action;
}

export class AddSetupFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Setup_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Get Franchisee payments
export class GetFranchiseePaymentsLoadAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Action;
    constructor(public payload: FranchiseeBillsFilterPayload) {}
}

export class GetFranchiseePaymentsLoadSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Success_Action;
    constructor(public payload: any) {}
}

export class GetFranchiseePaymentsLoadFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Get_Franchisee_Payments_Load_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Get franchisee payments filter
export class FranchiseePaymentsFilterAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Action;
    constructor(public paylaod: FranchiseeBillsFilterPayload) {}
}

export class FranchiseePaymentsFilterSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Success_Action;
    constructor( public payload: FranchiseePayments[] ) {}
}

export class FranchiseePaymentsFilterFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payments_Filter_Failure_Action;
    constructor( public payload: ErrorModel ) { }
}

//View Franchisee payment Detail Action
export class ViewFranchiseePaymentsDetailAction implements Action {
    readonly type = FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Action;
    constructor(public payload: getPaymentDetails) {}
}

export class ViewFranchiseePaymentsDetailSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Success_Action;
    constructor(public payload: ViewFranchiseePaymentDetails) {}
}

export class ViewFranchiseePaymentsDetailFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.View_Franchisee_Payments_Detail_Failure_Action;
    constructor(public payload: ErrorModel) {}
}

//Add penalty
export class AddPenaltyAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Penalty_Action;
    constructor( public paylaod: generatePenaltyService ) {}
}

export class AddPenaltySuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Penalty_Success_Action;
}

export class AddPenaltyFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Add_Penalty_Failure_Action;
    constructor( public payload: ErrorModel ) {}
}

//Franchisee Payment Acknowledge
export class FranchiseePaymentAcknowledgeAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Action;
    constructor( public payload: number ) {}
}

export class FranchiseePaymentAcknowledgeSuccessAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Success_Action;
}

export class FranchiseePaymentAcknowledgeFailureAction implements Action {
    readonly type = FranchiseeBillingActionTypes.Franchisee_Payment_Acknowledge_Failure_Action;
    constructor( public payalod: ErrorModel ) { }
}
export type FranchiseeBillingActions = BillSetupsListLoadAction
| BillSetupsListLoadSuccessAction
| BillSetupsListLoadFailureAction
| AddSetupLoadAction
| AddSetupLoadSuccessAction
| AddSetupLoadFailureAction
| AddSetupAction
| AddSetupSuccessAction
| AddSetupFailureAction
| GetFranchiseePaymentsLoadAction
| GetFranchiseePaymentsLoadSuccessAction
| GetFranchiseePaymentsLoadFailureAction
| FranchiseePaymentsFilterAction
| FranchiseePaymentsFilterSuccessAction
| FranchiseePaymentsFilterFailureAction
| ViewFranchiseePaymentsDetailAction
| ViewFranchiseePaymentsDetailSuccessAction
| ViewFranchiseePaymentsDetailFailureAction
| AddPenaltyAction
| AddPenaltySuccessAction
| AddPenaltyFailureAction
| FranchiseePaymentAcknowledgeAction
| FranchiseePaymentAcknowledgeSuccessAction
| FranchiseePaymentAcknowledgeFailureAction