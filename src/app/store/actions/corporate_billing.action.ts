import { Action } from '@ngrx/store';
import { BillsTableModel, BillsSetupModel, CreateBillSetupModel, BillsbyCorporateId, corporateDetailsByBillid, BillDetailsModel, CorporateBillsFilterPayload, EmailDetails, SendEmailModel, MiscellaneousAdjustmentsModel, Adjustments, generateAdjustmentService, generatePdfExcelService } from 'src/app/models/corporateBillingModel';
import { ErrorModel } from 'src/app/models/errorModel';

export enum CorporateBillingActionTypes {
    //Get Corporate Bills
    Corporate_Bills_List_Load_Action = "[CORPORATEBILLING] Corporate Bills List Load Action",
    Corporate_Bills_List_Load_Success_Action = "[CORPORATEBILLING] Corporate Bills List Load Success Action",
    Corporate_Bills_List_Load_Failure_Action = "[CORPORATEBILLING] Corporate Bills List Load Failure Action",
    //Get list of Setup Bills
    Bill_Setups_List_Load_Action = "[CORPORATEBILLING] Bill Setups List Load Action",
    Bill_Setups_List_Load_Success_Action = "[CORPORATEBILLING] Bill Setups List Load Success Action",
    Bill_Setups_List_Load_Failure_Action = "[CORPORATEBILLING] Bill Setups List Load Failure Action",
    //Set up bills load Action
    Setup_Bills_Load_Action = "[CORPORATEBILLING] Setup Bills Load Action",
    Setup_Bills_Load_Success_Action = "[CORPORATEBILLING] Setup Bills Load Success Action",
    Setup_Bills_Load_Failure_Action = "[CORPORATEBILLING] Setup Bills Load Failure Action",
    //Create Setup-bill Action
    Create_Setup_Bill_Action = "[CORPORATEBILLING] Create Setupbill Action",
    Create_Setup_Bill_Success_Action = "[CORPORATEBILLING] Create Setupbill Success Action",
    Create_Setup_Bill_Failure_action = "[CORPORATEBILLING] Create Setupbill Failure Action",
    //Bill details Load Action
    Bill_Details_Load_Action = "[CORPORATEBILLING] Bill Details Load Action",
    Bill_Details_Load_Success_Action = "[CORPORATEBILLING] Bill Details Load Success Action",
    Bill_Details_Load_Failure_Action = "[CORPORATEBILLING] Bill Details Load Failure Action",

    Corporate_Bills_Filter = "[CORPORATEBILLING] Corporate Bills Filter Action",
    Corporate_Bills_Filter_Success = "[CORPORATEBILLING] Corporate Bills Filter Action Success",
    Corporate_Bills_Filter_Failure = "[CORPORATEBILLING] Corporate Bills Filter Action Failure",

    Billing_Send_Email = "[CORPORATEBILLING] Billing Send Email Action",
    Billing_Send_Email_Success = "[CORPORATEBILLING] Billing Send Email Success Action",
    Billing_Send_Email_Failure = "[CORPORATEBILLING] Billing Send Email Failure Action",
    Billing_Generate_PDF = "[CORPORATEBILLING] Billing Generate PDF Action",
    Billing_Generate_PDF_Success = "[CORPORATEBILLING] Billing Generate PDF Success Action",
    Billing_Generate_PDF_Failure = "[CORPORATEBILLING] Billing Generate PDF Failure Action",
    //Send-email Load Action
    Send_Email_Load_Action = "[CORPORATEBILLING] Send Email Load Action",
    Send_Email_Load_Success_Action = "[CORPORATEBILLING] Send Email Load Success Action",
    Send_Email_Load_Failure_Action = "[CORPORATEBILLING] Send Email Load Failure Action",

    //add adjustments
    Add_Adjustments_Action = "[CORPORATEBILLING] Add Adjustments Action",
    Add_Adjustments_Success_Action = "[CORPORATEBILLING] Add Adjustments Success Action",
    Add_Adjustments_Failure_Action = "[CORPORATEBILLING] Add Adjustments Failure Action",

    //Bill Payment Status Change
    Bill_Payment_Status_Change_Action = "[CORPORATEBILLING] Bill Payment Status Change Action",
    Bill_Payment_Status_Change_Success_Action = "[CORPORATEBILLING] Bill Payment Status Change Success Action",
    Bill_Payment_Status_Change_Failure_Action = "[CORPORATEBILLING] Bill Payment Status Change Failure Action"
}

//Get Corporate Bills
export class CorporateBillsListLoadAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_List_Load_Action;
    constructor( public payload: CorporateBillsFilterPayload ) {}
}

export class CorporateBillsListLoadSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_List_Load_Success_Action;
    constructor(public payload: any[]) { }
}

export class CorporateBillsListLoadFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_List_Load_Failure_Action;
    constructor(public payload: ErrorModel) { }
}

//Get List of Setup bills
export class BillSetupsListLoadAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Setups_List_Load_Action;
}

export class BillSetupsListLoadSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Setups_List_Load_Success_Action;
    constructor( public payload: BillsSetupModel[] ) {}
}

export class BillSetupsListLoadFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Setups_List_Load_Failure_Action;
    constructor( public payload: ErrorModel ) {}
}

//Set up bills load Action
export class SetupBillsLoadAction implements Action {
    readonly type = CorporateBillingActionTypes.Setup_Bills_Load_Action;
}

export class SetupBillsLoadSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Setup_Bills_Load_Success_Action;
    constructor( public payload: any[] ) {}
}

export class SetupBillsLoadFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Setup_Bills_Load_Failure_Action;
    constructor( public payload: ErrorModel ) {}
}

//Create setup-billing Action
export class CreateSetupbillingAction implements Action {
    readonly type = CorporateBillingActionTypes.Create_Setup_Bill_Action;
    constructor( public payload: CreateBillSetupModel ) {}
}

export class CreateSetupbillingSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Create_Setup_Bill_Success_Action;
}

export class CreateSetupbillingFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Create_Setup_Bill_Failure_action;
    constructor( public payload: ErrorModel ) {}
}

//Bill Details Load Action
export class BillDetailsLoadAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Details_Load_Action;
    constructor( public payload: number ) {}
}

export class BillDetailsLoadSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Details_Load_Success_Action;
    constructor( public payload: BillDetailsModel ) {}
}

export class BillDetailsLoadFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Details_Load_Failure_Action;
    constructor( public payload: ErrorModel ) {}
}

//Bills Filter
export class CorporateBillsFilterAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_Filter;
    constructor( public payload: CorporateBillsFilterPayload) {}
}
export class CorporateBillsFilterSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_Filter_Success;
    constructor( public payload: BillsTableModel[]) {}
}
export class CorporateBillsFilterFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Corporate_Bills_Filter_Failure;
    constructor( public payload: ErrorModel) {}
}

//Generate PDF
export class BillingGeneratePDFAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Generate_PDF;
    constructor( public payload: generatePdfExcelService) {}
}
export class BillingGeneratePDFSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Generate_PDF_Success;
    constructor( public payload: any) {}
}
export class BillingGeneratePDFFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Generate_PDF_Failure;
    constructor( public payload: ErrorModel) {}
}

//Send Email
export class BillingSendEmailAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Send_Email;
    constructor( public payload: SendEmailModel) {}
}
export class BillingSendEmailSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Send_Email_Success;
}
export class BillingSendEmailFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Billing_Send_Email_Failure;
    constructor( public payload: ErrorModel) {}
}

//Send-email Load Action
export class SendEmailLoadAction implements Action {
    readonly type = CorporateBillingActionTypes.Send_Email_Load_Action;
    constructor( public payload: number ) { }
}

export class SendEmailLoadSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Send_Email_Load_Success_Action;
    constructor(public payload: any) { }
}

export class SendEmailLoadFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Send_Email_Load_Failure_Action;
    constructor( public payload: ErrorModel ) { }
}
//Add adjustments
export class AddAdjustmentsAction implements Action {
    readonly type = CorporateBillingActionTypes.Add_Adjustments_Action;
    constructor(public payload: generateAdjustmentService) {}
}

export class AddAdjustmentsSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Add_Adjustments_Success_Action;
}

export class AddAdjustmentsFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Add_Adjustments_Failure_Action;
    constructor(public payload: ErrorModel) {}
}


//Bill payment Status Change
export class BillPaymentStatusChangeAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Payment_Status_Change_Action;
    constructor(public payload: number) {}
}

export class BillPaymentStatusChangeSuccessAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Payment_Status_Change_Success_Action;
}

export class BillPaymentStatusChangeFailureAction implements Action {
    readonly type = CorporateBillingActionTypes.Bill_Payment_Status_Change_Failure_Action;
    constructor( public payload: ErrorModel ) {}
}

export type CorporateBillingAction = CorporateBillsListLoadAction
| CorporateBillsListLoadSuccessAction
| CorporateBillsListLoadFailureAction
| SetupBillsLoadAction
| SetupBillsLoadSuccessAction
| SetupBillsLoadFailureAction
| BillSetupsListLoadAction
| BillSetupsListLoadSuccessAction
| BillSetupsListLoadFailureAction
| CreateSetupbillingAction
| CreateSetupbillingSuccessAction
| CreateSetupbillingFailureAction
| BillDetailsLoadAction
| BillDetailsLoadSuccessAction
| BillDetailsLoadFailureAction
| CorporateBillsFilterAction
| CorporateBillsFilterSuccessAction
| CorporateBillsFilterFailureAction
| BillingSendEmailAction
| BillingSendEmailSuccessAction
| BillingSendEmailFailureAction
| BillingGeneratePDFAction
| BillingGeneratePDFSuccessAction
| BillingGeneratePDFFailureAction
| SendEmailLoadAction
| SendEmailLoadSuccessAction
| SendEmailLoadFailureAction
| AddAdjustmentsAction
| AddAdjustmentsSuccessAction
| AddAdjustmentsFailureAction
| BillPaymentStatusChangeAction
| BillPaymentStatusChangeSuccessAction
| BillPaymentStatusChangeFailureAction