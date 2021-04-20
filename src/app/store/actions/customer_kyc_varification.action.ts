import { Action } from '@ngrx/store';
import { ErrorModel } from 'src/app/models/errorModel';
import { SingleCustomerInDetail, ActiveInactiveRequest, customerKycDetails, ApproveRequest } from 'src/app/models/customerKycVerificationModel';
export enum CustomerKycVarificationActionTypes {
    Customer_Kyc_Detail_Load = "[CUSTOMER_KYC_VERIFICATION] Customer Kyc Detail Load",
    Customer_kyc_Detail_Load_Success = "[CUSTOMER_KYC_VERIFICATION] Customer_kyc_Detail_Load_Success",
    Customer_kyc_Detail_Load_Failure = "[CUSTOMER_KYC_VERIFICATION] Customer_kyc_Detail_Load_Failure",
    Customer_Kyc_List_Load = "[CUSTOMER_KYC_VERIFICATION] Customer_Kyc_List_Load",
    Customer_Kyc_List_Load_success = "[CUSTOMER_KYC_VERIFICATION] Customer_Kyc_List_Load_success",
    Customer_Kyc_List_Load_Failure = "[CUSTOMER_KYC_VERIFICATION] Customer_Kyc_List_Load_Failure",
    Activate_Kyc_Request = "[CUSTOMER_KYC_VERIFICATION] Activate_Kyc_Request",
    Activate_Kyc_Request_Success = "[CUSTOMER_KYC_VERIFICATION] Activate_Kyc_Request_Success",
    Activate_Kyc_Request_Failure = "[CUSTOMER_KYC_VERIFICATION] Activate_Kyc_Request_Failure",
    Inactivate_Kyc_Request = "[CUSTOMER_KYC_VERIFICATION] Inactivate_Kyc_Request",
    Inactivate_Kyc_Request_Success = "[CUSTOMER_KYC_VERIFICATION] Inactivate_Kyc_Request_Success",
    Inactivate_Kyc_Request_Failure = "[CUSTOMER_KYC_VERIFICATION] Inactivate_Kyc_Request_Failure",
    Approve_Request = "[CUSTOMER_KYC_VERIFICATION] Approve_Request",
    Approve_Request_Success = "[CUSTOMER_KYC_VERIFICATION] Approve_Request_Success",
    Approve_Request_Failure = "[CUSTOMER_KYC_VERIFICATION] Approve_Request_Failure"
}
//Customer Management List Load
export class CustomerKycListLoadAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_Kyc_List_Load;
    constructor(public payload: number) {}
}

export class CustomerKycListLoadSuccessAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_Kyc_List_Load_success;
    constructor(public payload: customerKycDetails[]) {}
}

export class CustomerKycListLoadFailureAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_Kyc_List_Load_Failure;
    constructor(public payload: ErrorModel) {}
}

//Active Request
export class ActiveKycAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Activate_Kyc_Request;
    constructor(public payload: ActiveInactiveRequest) {}
}

export class ActiveKycSuccessAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Activate_Kyc_Request_Success;
}


export class ActiveKycFailureAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Activate_Kyc_Request_Failure
    constructor(public payload: ErrorModel) {}
}

//Inactive Request
export class InactiveKycAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Inactivate_Kyc_Request;
    constructor(public payload: ActiveInactiveRequest) {}
}

export class InactiveKycSuccessAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Inactivate_Kyc_Request_Success
}

export class InactiveKycFailureAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Inactivate_Kyc_Request_Failure
    constructor(public payload: ErrorModel) {}
}



export class CustomerKycDetailLoadAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_Kyc_Detail_Load
    constructor(public payload: ActiveInactiveRequest) { }
}

export class CustomerKycDetailLoadSuccessAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_kyc_Detail_Load_Success
    constructor(public payload: any[]) { }
}

export class CustomerKycDetailLoadFailureAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Customer_kyc_Detail_Load_Failure
    constructor(public payload: ErrorModel) { }
}
//Approve Request
export class ApproveRequestAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Approve_Request;
    constructor(public payload: ApproveRequest) {}
}
export class ApproveRequestSuccessAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Approve_Request_Success;
    
}
export class ApproveRequestFailureAction implements Action {
    readonly type = CustomerKycVarificationActionTypes.Approve_Request_Failure
    constructor(public payload: ErrorModel) {}
}

export type CustomerKycVarificationAction = CustomerKycListLoadAction
| CustomerKycListLoadSuccessAction
| CustomerKycListLoadFailureAction
| ActiveKycAction
| ActiveKycSuccessAction
| ActiveKycFailureAction
| InactiveKycAction
| InactiveKycSuccessAction
| InactiveKycFailureAction
| CustomerKycDetailLoadAction
| CustomerKycDetailLoadSuccessAction
| CustomerKycDetailLoadFailureAction
| ApproveRequestAction
| ApproveRequestSuccessAction
| ApproveRequestFailureAction